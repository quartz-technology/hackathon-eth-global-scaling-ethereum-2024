import React from 'react';

import WalletConnectSignal from '@/assets/WalletConnectSignal.svg';

function Header() {
	return (
		<div className="mx-2 flex flex-1 border-b border-grey">
			<div className=" flex flex-[3_2_0%] flex-col justify-center">
				<div className="flex  ">
					<p className="text-xs text-secondGrey">Hi, Jessica</p>
				</div>
				<div className="flex">
					<h2 className="text-2xl font-bold text-White">Welcome Back</h2>
				</div>
			</div>
			<div className=" flex flex-1 items-center justify-end border-l border-grey">
				<button
					type="button"
					className="flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-purple-500 p-px"
				>
					<div className="m-px flex size-full items-center justify-center rounded-full bg-black p-2 text-lg  text-white hover:bg-grey">
						<WalletConnectSignal className="mr-1 size-7 fill-White" aria-hidden="true" />
						Wallet
					</div>
				</button>
			</div>
		</div>
	);
}

export default Header;
