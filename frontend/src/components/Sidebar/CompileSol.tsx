import { useState } from 'react';
import { toast } from 'react-toastify';

import { useCompileContext } from '@/contexts/CompileContext';
import { useWeb3Context } from '@/contexts/WalletContext';
import useCompileCode from '@/hooks/useCompileCode';

import { CompileButton, PublishButton } from './Buttons';
import ClipboardCopyButton from './ClipBoardCopyButton';
import ContractFunctionsCall from './ContractFunctionsCall';

function CompileSol() {
	const { web3Service } = useWeb3Context();
	const { contractAddress, abi, bytecode } = useCompileContext();
	const { compileCode } = useCompileCode();
	const [address, setAddress] = useState('');

	return (
		<>
			<div className="flex flex-1 flex-col  items-center justify-center ">
				<h2 className="m-2 flex self-start font-bold">- COMPILE & DEPLOY -</h2>
				<div className="flex flex-1 flex-col items-center justify-center gap-2 ">
					<div className="flex flex-col items-center justify-center gap-2 ">
						<div className="flex items-center justify-center">
							<CompileButton onClick={compileCode} />
						</div>
						<div className="flex items-center justify-center space-x-2">
							<input
								type="text"
								placeholder={`Load from address`}
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								className=" flex rounded-md border border-secondGrey bg-black p-2 focus:border-customOrange focus:outline-none sm:text-sm"
							/>
							<button
								className="flex rounded bg-customOrange p-2 text-xs text-white"
								onClick={() => {
									contractAddress.setValue!(address);
								}}
							>
								Load
							</button>
						</div>
						<div className="flex w-full">
							<PublishButton
								onClick={async () => {
									toast
										.promise(web3Service.deployContract(JSON.parse(abi.value), bytecode.value), {
											pending: 'Contract deploying..',
											success: 'Contract deployed!',
											error: 'Failed to deploy contract',
										})
										.then((contract) => {
											contractAddress.setValue!(contract as string);
										})
										.catch((error: Error) => {
											toast.error(`Deployment error: ${error.message}`);
										});
								}}
							/>
						</div>
					</div>

					<div className="flex flex-row gap-2 self-end">
						<ClipboardCopyButton text={contractAddress.value} label="Contract Address" />
						<ClipboardCopyButton text={abi.value} label="ABI" />
						<ClipboardCopyButton text={bytecode.value} label="Bytecode" />
					</div>
				</div>
			</div>
			<div className=" flex flex-1 flex-col border-t border-grey">
				<h2 className="m-2 flex font-bold">- INTERACT WITH CONTRACT -</h2>
				<div className="-ml-1 flex max-h-96 w-full  flex-col gap-2 overflow-y-auto ">
					<ContractFunctionsCall />
				</div>
			</div>
		</>
	);
}

export default CompileSol;
