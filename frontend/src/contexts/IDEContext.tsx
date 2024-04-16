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

interface IIDEContext {
	files: SetStateContext<IFileInfo[]>;
	selectedIndex: SetStateContext<number>;
}

const IDEContext = createContext<IIDEContext>({
	files: {
		value: [],
	},
	selectedIndex: {
		value: 0,
	},
});

export const IDEProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [selectedIndex, setSelectedIndex] = useState<number>(0);
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

contract EvenNumber {
	IRiscZeroVerifier public immutable verifier = IRiscZeroVerifier(0x83C2e9CD64B2A16D3908E94C7654f3864212E2F8);
	bytes32 public constant imageId = bytes32(0xf701f26dc10ab9c1e54749f003641f8d683d60f56d047fec8f87930394466ca6);
	
	uint256 public number;

	constructor(IRiscZeroVerifier _verifier) {
		verifier = _verifier;
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
		<IDEContext.Provider
			value={{
				files: {
					value: files,
					setValue: setFiles,
				},
				selectedIndex: {
					value: selectedIndex,
					setValue: setSelectedIndex,
				},
			}}
		>
			{children}
		</IDEContext.Provider>
	);
};

export const useIDEContext = () => useContext(IDEContext);
