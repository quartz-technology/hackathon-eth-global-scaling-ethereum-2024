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
										pending: 'zkVM running',
										success: 'Prooved',
										error: 'zkVM execution failed',
									});
									updatePostDigest(
										'0x446669d1c6e6ceafb5c82b9e68fdbf66ba74855b9340dabdd6ea6340aa055208',
									);
									updateSeal(
										'0x23e9d92023fdcf3e6f8fb42b6f903c43cc92aa742ca7a0b60f4d3832b2af1c1f1cd610d8f91776c7ced1be6423474004c07d800a60e9fb679b8dcd0888ddf9b205212f8cfb900949b1e2dbadfc4ac1f196e4d95a6690efb1d98311b63564aff92bdb7bfcf93117cca48116236dd411b7fda22a87c36d7e882b1cd5664e64c798207a5a4e4661465ef810c3b3c5a73ae944b9b4292f29a3fab94e9806b3d2a6af23878b980e08b402236d7008904ce5d53cd02e2040503bf6bdfdc0ac8dd19b3d0584a0a26384e3bd585dc1ca3328cd2e848723ad8689600e7997d6017109117a2e7f81b02b3bbdcd7bf8cddfcdee5415c4d9fb752e800bec21e6d42bfa35f0a2',
									);
									updateResult(42);
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
