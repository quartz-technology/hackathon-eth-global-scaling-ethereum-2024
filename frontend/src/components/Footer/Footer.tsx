/* eslint-disable react/jsx-key */
import 'react-toastify/dist/ReactToastify.css';

import React, { ReactElement, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { RxClipboardCopy } from 'react-icons/rx';
import { toast, ToastContainer } from 'react-toastify';

import { useIDEContext } from '@/contexts/IDEContext';

function ComponentOne() {
	const { files } = useIDEContext();
	const [byteCode, setByteCode] = useState('');
	const [abi, setAbi] = useState('');
	const [loading, setLoading] = useState(false);

	const compileCode = async () => {
		setLoading(true);
		const code = files.value[0].content;
		const contractNameMatch = code.match(/contract\s+(\w+)\s+/);
		if (!contractNameMatch) {
			toast.error('Compilation error: Contract name not found.');
			setByteCode('');
			setAbi('');
			setLoading(false);
			return;
		}
		const contractName = contractNameMatch[1];

		try {
			const response = await fetch('/api/compile', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ code, contractName }),
			});
			const data = await response.json();
			if (response.ok) {
				setByteCode(data.bytecode);
				setAbi(JSON.stringify(data.abi, null, 2));
			} else {
				throw new Error(data.error || 'An error occurred during compilation.');
			}
		} catch (error) {
			toast.error(`Compilation error: ${error.message}`);
			setByteCode('');
			setAbi('');
		}
		setLoading(false);
	};

	return (
		<>
			<ToastContainer position="top-center" autoClose={5000} />
			<div className="flex flex-1 items-center justify-center">
				<button
					onClick={compileCode}
					type="button"
					className="rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
					disabled={loading}
				>
					Compile
				</button>
			</div>
			<div className="flex flex-1 items-center justify-evenly ">
				<div style={{ position: 'relative' }}>
					<CopyToClipboard text={byteCode} onCopy={() => toast.success('Bytecode copied to clipboard!')}>
						<div className="flex flex-row items-center">
							<RxClipboardCopy className="mr-1 size-5" aria-hidden="true" />

							<button disabled={!byteCode}>ByteCode</button>
						</div>
					</CopyToClipboard>
				</div>
				<div style={{ position: 'relative' }}>
					<CopyToClipboard text={abi} onCopy={() => toast.success('ABI copied to clipboard!')}>
						<div className="flex flex-row items-center">
							<RxClipboardCopy className="mr-1 size-5" aria-hidden="true" />

							<button disabled={!abi}>ABI</button>
						</div>
					</CopyToClipboard>
				</div>
			</div>
		</>
	);
}

const ComponentTwo: React.FC = () => <div>Component Two</div>;

function DynamicComponentLoader() {
	const { selectedIndex } = useIDEContext();
	const componentMap = new Map<number, ReactElement>([
		[0, <ComponentOne />],
		[1, <ComponentTwo />],
	]);

	return <div className="flex size-full flex-col ">{componentMap.get(selectedIndex.value)}</div>;
}

export default DynamicComponentLoader;
