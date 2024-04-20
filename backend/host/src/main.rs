use methods::{ZKORA_ELF, ZKORA_ID};
use risc0_zkvm::recursion::identity_p254;
use risc0_zkvm::{default_prover, get_prover_server, stark_to_snark, ExecutorEnv, ProverOpts};

#[macro_use]
extern crate rocket;

use rocket::serde::{json::Json, Deserialize, Serialize};

#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
struct ZKScriptExecutionResult {
    pub x: u32,
    pub post_state_digest: String,
    pub seal: String,
}

#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
struct ZKScript<'r> {
    code: &'r str,
}

#[post("/", format = "json", data = "<zkscript>")]
fn execute_script(zkscript: Json<ZKScript<'_>>) -> Json<ZKScriptExecutionResult> {
    let env = ExecutorEnv::builder()
        .write(&zkscript.code)
        .unwrap()
        .build()
        .unwrap();

    let prover = default_prover();

    let opts = ProverOpts::default();
    let prover_server = get_prover_server(&opts).unwrap();

    let receipt = prover.prove(env, ZKORA_ELF).unwrap();

    let mut x: u32 = 0;
    let mut post_state_digest: String = "".to_string();
    let mut seal: String = "".to_string();

    match receipt.inner {
        risc0_zkvm::InnerReceipt::Composite(r) => {
            x = receipt.journal.decode().unwrap();

            let post_state = r.get_claim().unwrap().post.clone().value().unwrap();
            post_state_digest = format!("0x{}", hex::encode(post_state.merkle_root.as_bytes()));

            let succinct_receipt = prover_server.compress(&r);

            match succinct_receipt {
                Ok(sr) => {
                    let ident_receipt = identity_p254(&sr).unwrap();
                    let seal_bytes = ident_receipt.get_seal_bytes();

                    seal = format!(
                        "0x{}",
                        hex::encode(stark_to_snark(&seal_bytes).unwrap().to_vec())
                    );
                }
                Err(_) => {
                    println!("Error compressing receipt")
                }
            }
        }
        _ => {
            println!("Other receipt type found but not supported")
        }
    }

    Json(ZKScriptExecutionResult {
        x: x,
        post_state_digest: hex::encode(post_state_digest),
        seal: hex::encode(seal.clone()),
    })
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/execute", routes![execute_script])
}
