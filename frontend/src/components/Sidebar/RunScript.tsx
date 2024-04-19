import { useState } from 'react';
import { toast } from 'react-toastify';

import { useCompileContext } from '@/contexts/CompileContext';

import { RunScriptButton } from './Buttons';
import ClipboardCopyButton from './ClipBoardCopyButton';

function RunScript() {
	const { zkResult } = useCompileContext();

	const updatePostDigest = (newPostDigest: string) => {
		if (!zkResult.setValue) return;
		zkResult.setValue((current) => ({
			...current,
			postDigest: newPostDigest,
		}));
	};

	const updateSeal = (newSeal: string) => {
		if (!zkResult.setValue) return;
		zkResult.setValue((current) => ({
			...current,
			seal: newSeal,
		}));
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const updateResult = (newResult: any) => {
		if (!zkResult.setValue) return;
		zkResult.setValue((current) => ({
			...current,
			result: newResult,
		}));
	};

	// TODO :)
	const resolveAfter3Sec = new Promise((resolve) => {
		setTimeout(resolve, 5000);
	});

	return (
		<>
			<div className="flex flex-1 flex-col  items-center justify-center ">
				<h2 className="m-2 flex self-start font-bold">- RUN SCRIPT IN zkVM -</h2>
				<div className="flex flex-1 flex-col items-center justify-center gap-2 ">
					<div className="flex flex-col items-center justify-center gap-2 ">
						<div className="flex w-full items-center justify-center">
							<RunScriptButton
								onClick={() => {
									toast.promise(resolveAfter3Sec, {
										pending: 'ZkVM running',
										success: 'Proofed',
										error: 'Oops',
									});
									updatePostDigest('ok');
									updateSeal('no');
									updateResult(30);
									console.log('TODO');
								}}
							/>
						</div>
					</div>

					<div className="flex flex-row gap-2 self-end">
						<ClipboardCopyButton text={zkResult.value.seal} label="seal" />
						<ClipboardCopyButton text={zkResult.value.postDigest} label="postDisgest" />
					</div>
				</div>
			</div>
			<div className=" flex flex-1 flex-col border-t border-grey">
				<h2 className="m-2 flex self-start font-bold">- RESULT -</h2>
				<div className="flex flex-1 items-center justify-center">
					<p>{zkResult.value.result}</p>
				</div>
			</div>
		</>
	);
}

export default RunScript;
