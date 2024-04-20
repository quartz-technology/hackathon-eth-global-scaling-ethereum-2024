'use client';

import React, { createContext, ReactNode, useContext, useState } from 'react';

interface SetStateContext<T> {
	value: T;
	setValue?: React.Dispatch<React.SetStateAction<T>>;
}

interface IFileInfo {
	name: string;
	language: string;
	content: string;
}

interface IZkResult {
	postDigest: string;
	seal: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	result: any;
}

interface ICompileContext {
	files: SetStateContext<IFileInfo[]>;
	selectedIndex: SetStateContext<number>;
	contractAddress: SetStateContext<string>;
	abi: SetStateContext<string>;
	bytecode: SetStateContext<string>;
	zkResult: SetStateContext<IZkResult>;
}

const CompileContext = createContext<ICompileContext>({
	files: {
		value: [],
	},
	selectedIndex: {
		value: 0,
	},
	contractAddress: {
		value: '',
	},
	abi: {
		value: '',
	},
	bytecode: {
		value: '',
	},
	zkResult: {
		value: {
			postDigest: '',
			seal: '',
			result: '',
		},
	},
});

export const CompileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [selectedIndex, setSelectedIndex] = useState<number>(0);
	const [contractLabel, setContractLabel] = useState<string>('');
	const [abi, setAbi] = useState<string>('');
	const [bytecode, setBytecode] = useState<string>('');
	const [zkResult, setZkResult] = useState<IZkResult>({ seal: '', postDigest: '', result: '' });
	const [files, setFiles] = useState<IFileInfo[]>([
		{
			name: 'deploy.sol',
			language: 'sol',
			content: `struct ExitCode {
	SystemExitCode system;
	uint8 user;
}

enum SystemExitCode {
	Halted,
	Paused,
	SystemSplit
}

struct ReceiptClaim {
	bytes32 preStateDigest;
	bytes32 postStateDigest;
	ExitCode exitCode;
	bytes32 input;
	bytes32 output;
}

struct Receipt {
	bytes seal;
	ReceiptClaim claim;
}

interface IRiscZeroVerifier {
	function verify(bytes calldata seal, bytes32 imageId, bytes32 postStateDigest, bytes32 journalDigest)
		external view
		returns (bool);

	function verify_integrity(Receipt calldata receipt) external view returns (bool);
}

contract ZKoraContract {
	IRiscZeroVerifier public immutable verifier = IRiscZeroVerifier(0x1dCB83CAaf036E54af6a033Ec85E56F773cB3AcC);
	bytes32 public constant imageId = bytes32(0x0f91e35e2e05e74548d9b7cf8700e1762d7b9db28c400a701203dc37586998cf);

	uint256 public number;

	constructor() {
		number = 0;
	}

	function set(uint256 x, bytes32 postStateDigest, bytes calldata seal) public {
		bytes memory journal = abi.encode(x);
		require(verifier.verify(seal, imageId, postStateDigest, sha256(journal)));
		number = x;
	}
}`,
		},
		{
			name: 'zkScript.js',
			language: 'javascript',
			content: `let res = 1 + 1;
res`,
		},
	]);

	return (
		<CompileContext.Provider
			value={{
				files: {
					value: files,
					setValue: setFiles,
				},
				selectedIndex: {
					value: selectedIndex,
					setValue: setSelectedIndex,
				},
				contractAddress: {
					value: contractLabel,
					setValue: setContractLabel,
				},
				abi: {
					value: abi,
					setValue: setAbi,
				},
				bytecode: {
					value: bytecode,
					setValue: setBytecode,
				},
				zkResult: {
					value: zkResult,
					setValue: setZkResult,
				},
			}}
		>
			{children}
		</CompileContext.Provider>
	);
};

export const useCompileContext = () => useContext(CompileContext);
