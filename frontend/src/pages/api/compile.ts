/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from 'next';
import solc from 'solc';

interface CompileRequest {
	code: string;
	contractName: string;
}

interface CompileResponse {
	bytecode?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	abi?: any;
	error?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<CompileResponse>) {
	if (req.method !== 'POST') {
		res.status(405).json({ error: 'Method Not Allowed' });
		return;
	}

	const { code, contractName } = req.body as CompileRequest;

	if (!code || !contractName) {
		res.status(400).json({ error: 'No Solidity code or contract name provided' });
		return;
	}

	try {
		const input = {
			language: 'Solidity',
			sources: {
				'Contract.sol': {
					content: code,
				},
			},
			settings: {
				outputSelection: {
					'*': {
						'*': ['*'],
					},
				},
			},
		};

		const output = JSON.parse(solc.compile(JSON.stringify(input)));
		const contractOutput = output.contracts['Contract.sol'][contractName];
		if (!contractOutput) {
			throw new Error('Compilation failed, no output for the contract');
		}

		const bytecode = contractOutput.evm.bytecode.object;
		const { abi } = contractOutput;

		// Validate that at least one function has the required parameters
		const requiredParams = [
			{ name: 'postStateDigest', type: 'bytes32' },
			{ name: 'seal', type: 'bytes' },
		];
		const hasRequiredParams = abi.some((item: { type: string; inputs: { name: any; type: any }[] }) => {
			if (item.type === 'function') {
				const paramNamesTypes = item.inputs.map((tmp: { name: any; type: any }) => ({
					name: tmp.name,
					type: tmp.type,
				}));
				return requiredParams.every((reqParam) =>
					paramNamesTypes.some(
						(param: { name: string; type: string }) =>
							param.name === reqParam.name && param.type === reqParam.type,
					),
				);
			}
			return false;
		});

		if (!hasRequiredParams) {
			throw new Error('No function with the required parameters (postStateDigest or seal) found.');
		}

		res.status(200).json({ bytecode, abi });
	} catch (error) {
		console.error('Compilation error:', error);
		res.status(500).json({ error: `Compilation error: ${error.message}` });
	}
}
