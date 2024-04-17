/* eslint-disable react/jsx-key */
import 'react-toastify/dist/ReactToastify.css';

import React, { ReactElement, useState } from 'react';

import { useCompileContext } from '@/contexts/CompileContext';

import CompileSol from './CompileSol';

const ComponentTwo: React.FC = () => <div>Component Two</div>;

function DynamicComponentLoader() {
	const { selectedIndex } = useCompileContext();
	const componentMap = new Map<number, ReactElement>([
		[0, <CompileSol />],
		[1, <ComponentTwo />],
	]);

	return <div className="flex size-full flex-col">{componentMap.get(selectedIndex.value)}</div>;
}

export default DynamicComponentLoader;
