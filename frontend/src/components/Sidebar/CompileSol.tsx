import { ToastContainer } from 'react-toastify';

import { useCompileContext } from '@/contexts/CompileContext';
import useCompileCode from '@/hooks/useCompileCode';

import { CompileButton, PublishButton } from './Buttons';
import ClipboardCopyButton from './ClipBoardCopyButton';

function CompileSol() {
	const { abi, bytecode } = useCompileContext();
	const { compileCode } = useCompileCode();

	return (
		<>
			<ToastContainer position="top-center" autoClose={5000} />
			<div className="flex flex-1 flex-col  items-center justify-center ">
				<h2 className="m-2 flex self-start underline">SOLIDITY COMPILER & DEPLOY</h2>
				<div className="flex flex-1 flex-col items-center justify-center gap-2 ">
					<div className="flex flex-col items-center justify-center gap-2 ">
						<div className="flex items-center justify-center ">
							<CompileButton onClick={compileCode} />
						</div>
						<div className="flex w-full">
							<PublishButton
								onClick={() => {
									console.log('TODO');
								}}
							/>
						</div>
					</div>

					<div className="flex flex-row gap-2 self-end">
						<ClipboardCopyButton text={abi.value} label="ABI" />
						<ClipboardCopyButton text={bytecode.value} label="Bytecode" />
					</div>
				</div>
			</div>
			<div className="z-10 flex flex-1 flex-col border-t border-grey">
				<h2 className="m-2 flex underline">RUN TRANSACTION</h2>
				<div className="flex flex-1 flex-col items-center justify-center gap-2"></div>
			</div>
		</>
	);
}

export default CompileSol;
