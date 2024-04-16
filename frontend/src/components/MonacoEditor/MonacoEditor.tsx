// components/MonacoEditor.tsx
import Editor from '@monaco-editor/react';
import React, { useEffect, useState } from 'react';

interface MonacoEditorProps {
	defaultValue: string;
	language: string;
	onChange: (value: string | undefined) => void;
}

function MonacoEditor({ defaultValue, language, onChange }: MonacoEditorProps) {
	const [editorTheme, setEditorTheme] = useState('vs-dark');

	// Load hc-block theme when component is ready
	useEffect(() => {
		const themeChangeTimeout = setTimeout(() => {
			setEditorTheme('hc-black');
		}, 0);

		return () => clearTimeout(themeChangeTimeout);
	}, []);

	return (
		<Editor
			height="100%"
			width="100%"
			defaultLanguage={language}
			defaultValue={defaultValue}
			theme={editorTheme}
			onChange={onChange}
			options={{
				theme: editorTheme,
			}}
		/>
	);
}

export default MonacoEditor;
