import React from 'react';

import Dashboard from '@/components/Dashboard/Dasboard';
import Layout from '@/components/Layout';

// const CreateSafeComponent = dynamic(() => import('../components/SafeManager'), {
// 	ssr: false,
// });

function HomePage() {
	return (
		<Layout>
			<Dashboard />
		</Layout>
	);
}

export default HomePage;
