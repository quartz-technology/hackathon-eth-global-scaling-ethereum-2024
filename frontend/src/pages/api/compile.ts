// pages/api/compile.ts
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

		res.status(200).json({ bytecode, abi });
	} catch (error) {
		console.error('Compilation error:', error);
		res.status(500).json({ error: `Compilation error: ${error.message}` });
	}
}
