import { Tab } from '@headlessui/react';
import React, { useEffect, useRef, useState } from 'react';

import MonacoEditor from './MonacoEditor';

function IDE() {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [indicatorStyle, setIndicatorStyle] = useState({});
	const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

	const [files, setFiles] = useState([
		{ name: 'zkContract.sol', language: 'sol', content: '// code for file 1' },
		{ name: 'deploy.sol', language: 'sol', content: '// code for file 2' },
	]);

	const handleEditorChange = (content: string | undefined, idx: number) => {
		if (content !== undefined) {
			const newFiles = files.map((file, index) => {
				if (index === idx) {
					return { ...file, content };
				}
				return file;
			});
			setFiles(newFiles);
			// saveFileContent(idx, content); // TODO IPFS SAVE FILES
		}
	};

	useEffect(() => {
		const tab = tabsRef.current[selectedIndex];
		if (tab) {
			setIndicatorStyle({
				left: tab.offsetLeft,
				width: tab.offsetWidth,
				transition: 'left 300ms ease-in-out, width 300ms ease-in-out',
			});
		}
	}, [selectedIndex]);

	return (
		<div className="flex size-full flex-col ">
			<Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
				<div className="relative">
					<Tab.List className="flex space-x-1 rounded-xl  p-1">
						{files.map((file, idx) => (
							<Tab
								key={idx}
								ref={(el) => (tabsRef.current[idx] = el)}
								className="w-full rounded-lg py-2.5 text-sm  font-medium leading-5 text-White ring-0 focus:outline-none"
							>
								{file.name}
							</Tab>
						))}
					</Tab.List>
					<div className="absolute bottom-0 mb-2 h-0.5 rounded-full bg-White" style={indicatorStyle} />
				</div>
				<Tab.Panels className="flex h-full">
					{files.map((file, idx) => (
						<Tab.Panel key={idx} className=" flex size-full">
							<MonacoEditor
								defaultValue={file.content}
								language={file.language}
								onChange={(content) => handleEditorChange(content, idx)}
							/>
						</Tab.Panel>
					))}
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
}

export default IDE;
