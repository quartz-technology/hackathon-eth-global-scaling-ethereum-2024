/* eslint-disable react/jsx-key */
import 'react-toastify/dist/ReactToastify.css';

import React, { ReactElement } from 'react';
import { ToastContainer } from 'react-toastify';

import { useCompileContext } from '@/contexts/CompileContext';

import CompileSol from './CompileSol';
import RunScript from './RunScript';

function DynamicComponentLoader() {
	const { selectedIndex } = useCompileContext();
	const componentMap = new Map<number, ReactElement>([
		[0, <CompileSol />],
		[1, <RunScript />],
	]);

	return (
		<>
			<ToastContainer position="bottom-right" theme="dark" hideProgressBar={true} autoClose={3000} closeOnClick />
			<div className="flex size-full flex-col">{componentMap.get(selectedIndex.value)}</div>
		</>
	);
}

export default DynamicComponentLoader;
