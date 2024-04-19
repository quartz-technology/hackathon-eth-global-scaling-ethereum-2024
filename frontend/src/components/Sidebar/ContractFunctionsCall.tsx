import React, { useEffect, useState } from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

import { useCompileContext } from '@/contexts/CompileContext';

type ABI = Array<{
	name: string;
	type: string;
	inputs: Array<{
		name: string;
		type: string;
	}>;
}>;

type InputsType = { [funcName: string]: string[] };

const ContractFunctionsCall: React.FC = () => {
	const { abi, zkResult } = useCompileContext();
	const [inputs, setInputs] = useState<InputsType>({});
	const [openFunctions, setOpenFunctions] = useState<{ [key: string]: boolean }>({});

	useEffect(() => {
		// Initialize input values based on zkResult
		if (abi.value) {
			const abiParsed: ABI = JSON.parse(abi.value);

			const newInputs = abiParsed.reduce((acc, func) => {
				const inputValues = func.inputs.map((input) => {
					if (input.name === 'postStateDigest') return zkResult.value.postDigest;
					if (input.name === 'seal') return zkResult.value.seal;
					return '';
				});
				acc[func.name] = inputValues;
				return acc;
			}, {} as InputsType);

			setInputs(newInputs);
		}
	}, [abi.value, zkResult.value.postDigest, zkResult.value.seal]);

	const handleInputChange = (funcName: string, index: number, value: string) => {
		setInputs({
			...inputs,
			[funcName]: {
				...inputs[funcName],
				[index]: value,
			},
		});
	};

	const toggleFunction = (funcName: string) => {
		setOpenFunctions({
			...openFunctions,
			[funcName]: !openFunctions[funcName],
		});
	};

	const callFunction = (funcName: string) => {
		console.log('Calling function:', funcName, 'with inputs:', inputs[funcName]);
		// Here you would add your contract call logic
	};

	if (!abi.value)
		return (
			<div className="flex w-36 items-center justify-center self-center text-center text-xs italic">
				Waiting for contract compilation..
			</div>
		);

	const abiParsed: ABI = JSON.parse(abi.value);

	return (
		<div className="flex flex-col gap-1 ">
			{abiParsed
				.filter((item) => item.type === 'function' && item.inputs.length > 0)
				.map((func, idx) => (
					<div key={idx} className="w-full rounded-lg border border-grey p-4 shadow-md">
						<button
							onClick={() => toggleFunction(func.name)}
							className="flex w-full items-center justify-between text-left"
						>
							<span className="font-semibold">{func.name}</span>
							{openFunctions[func.name] ? (
								<FaCaretUp className="size-5" />
							) : (
								<FaCaretDown className="size-5" />
							)}
						</button>
						{openFunctions[func.name] && (
							<div className="mt-2 flex flex-col">
								{func.inputs.map((input, inputIdx) => (
									<div key={inputIdx} className="flex flex-row items-center justify-end">
										<p className="text-xs text-secondGrey">{input.name}:</p>
										<input
											type="text"
											placeholder={`${input.type}`}
											value={inputs[func.name]?.[inputIdx] || ''}
											onChange={(e) => handleInputChange(func.name, inputIdx, e.target.value)}
											className="mt-1 flex w-36 rounded-md border border-secondGrey bg-black p-2 focus:border-customOrange focus:outline-none sm:text-sm"
										/>
									</div>
								))}
								<div className="mt-2 flex justify-end">
									<button
										className="flex rounded bg-customOrange p-2 text-xs text-white"
										onClick={() => callFunction(func.name)}
									>
										Transact
									</button>
								</div>
							</div>
						)}
					</div>
				))}
		</div>
	);
};

export default ContractFunctionsCall;
