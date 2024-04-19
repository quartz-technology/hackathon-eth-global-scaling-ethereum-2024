import { useState } from 'react';
import { toast } from 'react-toastify';

import { RunScriptButton } from './Buttons';
import ClipboardCopyButton from './ClipBoardCopyButton';

function RunScript() {
	const [seal, setSeal] = useState<string>('');
	const [postDigest, setPostDigest] = useState<string>('');

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
									console.log('TODO');
								}}
							/>
						</div>
					</div>

					<div className="flex flex-row gap-2 self-end">
						<ClipboardCopyButton text={seal} label="seal" />
						<ClipboardCopyButton text={postDigest} label="postDisgest" />
					</div>
				</div>
			</div>
			<div className=" flex flex-1 flex-col border-t border-grey">
				<h2 className="m-2 flex self-start font-bold">- RESULT -</h2>
			</div>
		</>
	);
}

export default RunScript;