import React from 'react';

import IDE from '../MonacoEditor/IDE';

function Dashboard() {
	return (
		<div className="mx-2 flex size-full ">
			<div className="flex-1 border-r border-grey ">{/* List Person */}</div>

			<div className="flex flex-[3_2_0%] flex-col ">
				<div className="flex flex-[5_2_0%] ">
					<div className="flex-1 ">
						{/* Monaco view */}
						<IDE />
					</div>
				</div>
				<div className="flex-1 border-t border-grey ">Information</div>
			</div>
		</div>
		// <div className="flex size-full flex-col bg-Black">
		// 	<div className="p-20">
		// 		<div className="flex h-32 w-full items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-purple-500 py-0.5">
		// 			<div className="m-0.5 flex size-full items-center justify-center rounded-lg bg-Black text-lg font-bold ">
		// 				Contenu de la div interne
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
	);
}

export default Dashboard;
