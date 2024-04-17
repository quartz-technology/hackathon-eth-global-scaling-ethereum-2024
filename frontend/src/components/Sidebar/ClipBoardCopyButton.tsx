import { CopyToClipboard } from 'react-copy-to-clipboard';
import { RxClipboardCopy } from 'react-icons/rx';
import { toast } from 'react-toastify';

interface ClipboardCopyButtonProps {
	text: string;
	label: string;
}

const ClipboardCopyButton: React.FC<ClipboardCopyButtonProps> = ({ text, label }) => (
	<CopyToClipboard text={text} onCopy={() => toast.success(`${label} copied to clipboard!`)}>
		<button className="flex flex-row items-center text-xs" disabled={!text}>
			<div className="flex flex-row items-center">
				<RxClipboardCopy className="mr-1 size-3" aria-hidden="true" />
				{label}
			</div>
		</button>
	</CopyToClipboard>
);

export default ClipboardCopyButton;
