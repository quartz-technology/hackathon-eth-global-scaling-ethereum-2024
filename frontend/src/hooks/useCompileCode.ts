import { useState } from 'react';
import { toast } from 'react-toastify';

import { useCompileContext } from '@/contexts/CompileContext';

interface CompileData {
	bytecode: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	abi: any[];
}

export default function useCompileCode() {
	const { files, abi, bytecode } = useCompileContext();
	const [loading, setLoading] = useState<boolean>(false);

	const compileCode = async () => {
		setLoading(true);
		const code: string = files.value[0].content;
		const contractNameMatch = code.match(/contract\s+(\w+)\s+/);

		if (!bytecode.setValue || !abi.setValue) return;
		if (!contractNameMatch) {
			toast.error('Compilation error: Contract name not found.');
			bytecode.setValue('');
			abi.setValue('');
			setLoading(false);
			return;
		}

		const contractName = contractNameMatch[1];

		try {
			const response = await fetch('/api/compile', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ code, contractName }),
			});
			const data: CompileData = await response.json();

			if (response.ok) {
				bytecode.setValue(data.bytecode);
				abi.setValue(JSON.stringify(data.abi, null, 2));
			} else {
				throw new Error(data.error || 'An error occurred during compilation.');
			}
		} catch (error) {
			if (error instanceof Error) {
				toast.error(`Compilation error: ${error.message}`);
				console.error(`Compilation error: ${error.message}`);
			}

			bytecode.setValue('');
			abi.setValue('');
		}
		setLoading(false);
	};

	return { compileCode, loading };
}
