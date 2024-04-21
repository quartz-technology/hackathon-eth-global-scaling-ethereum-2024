# Hackathon ETHGlobal Scaling Ethereum 2024

## zkora

zkora is a platform where you can write JavaScript scripts that run in a zkVM to offload on-chain Solidity computations.

For example, you could run a script that calculates the square root of a number off-chain, and then only submit the result and proof of execution to your Solidity smart contract tht performs a simple verification.
It acts as an Oracle, but verifiable using the power of zero-knowledge proofs. Hence the name, zkora!

## Introduction

There are two components to zkora:
- **The frontend**: A web interface where you can write and run scripts as well as Solidity smart contract.
- **The backend**: A Rust server that runs the zkVM using the JavaScript code you've written.

The frontend is a Next app which uses the web3auth along with ERC-4337 Safe Accounts to authenticate developers. At its core, it's similar to the popular Remix application, where you can write and deploy Solidity smart contracts. The difference is that you can also write JavaScript scripts that run in a zkVM.
We used Smart Accounts to provide a seamless experience for developers: they have a simple way to authenticate and are directly ready to deploy their smart contracts and play with the ZKScript.
The frontend lets the developper compile, deploy and interact with the smart contract methods on the Sepolia testnet.

The backend on the other hand is the zkVM server. It runs the JavaScript code you've written in the frontend and generates a proof of execution. The proof is then sent back to the frontend, which can then be used to verify the execution on-chain when you call the method which takes the execution result value along with the proofs.
It leverages the Risc0 project to run the zkVM directly in Rust.

## Disclaimer

This project is a submission for the Scaling Ethereum 2024 Hackathon. The project is a work in progress and is not intended for production use. The project is provided as is and is not intended for any other purpose than testing.

Do not deploy this project to a production / mainnet environment.
Do not use this project with real funds.

We will never ask for your private keys or seed phrases. Do not share your private keys or seed phrases with anyone. We will never ask you to invest in this project.

## Authors

Made with ❤️ by the 🤖 at [Quartz](https://quartz.technology).
