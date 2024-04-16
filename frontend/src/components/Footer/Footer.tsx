/* eslint-disable react/jsx-key */
import React, { ReactElement } from 'react';

import { useIDEContext } from '@/contexts/IDEContext';

const ComponentOne: React.FC = () => <div>Component One</div>;
const ComponentTwo: React.FC = () => <div>Component Two</div>;

function DynamicComponentLoader() {
	const { selectedIndex } = useIDEContext();
	const componentMap = new Map<number, ReactElement>([
		[0, <ComponentOne />],
		[1, <ComponentTwo />],
	]);

	return <div>{componentMap.get(selectedIndex.value)}</div>;
}

export default DynamicComponentLoader;
