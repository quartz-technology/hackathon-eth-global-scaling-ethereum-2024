use boa_engine::{Context, Source};
use risc0_zkvm::guest::env;

fn main() {
    // TODO: Implement your guest code here.
    let js_code: String = env::read();

    // Instantiate the execution context.
    let mut context = Context::default();

    // Parse the source code.
    let result = context.eval(Source::from_bytes(js_code.as_str())).unwrap();

    // write public output to the journal.
    env::commit(&result.to_u32(&mut context).unwrap());
}
