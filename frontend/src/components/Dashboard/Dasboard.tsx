import React from 'react';

function Dashboard() {
	return (
		// TODO: Just an example
		<div className="mx-2 flex size-full bg-red-500">
			<div className="flex flex-[3_2_0%] flex-col bg-blue-500">
				<div className="flex-1 bg-green-500">{/* Information Vault */}</div>
				<div className="flex flex-[5_2_0%] bg-pink-500">
					<div className="flex-[3_2_0%] bg-purple-500">{/* Pie Chart */}</div>
					<div className="flex-1 bg-orange-500">{/* List deposit addr */}</div>
				</div>
			</div>
			<div className="flex-1 border-l border-grey bg-yellow-500">{/* List Person */}</div>
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
