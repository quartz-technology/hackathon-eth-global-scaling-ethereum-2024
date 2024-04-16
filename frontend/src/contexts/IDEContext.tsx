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
			content: `pragma solidity ^0.8.24;
				
contract MyContract {
				
	function callback(<...>, bytes32 postStateDigest, bytes calldata seal) public {
	// TODO: 
	}
}`,
		},
		{
			name: 'zkContract.sol',
			language: 'sol',
			content: `pragma solidity ^0.8.24;
		
contract zkContract {
		
	function zkvm_entrypoint(<...>) public {
	// TODO: 
	}
}`,
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
