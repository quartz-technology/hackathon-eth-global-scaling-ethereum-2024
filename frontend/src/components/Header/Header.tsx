import React from 'react';

import WalletConnectSignal from '@/assets/WalletConnectSignal.svg';

import WalletButton from './WalletButton';

function Header() {
	return (
		<div className="mx-2 flex flex-1 border-b border-grey">
			<div className="mr-2 flex items-center border border-grey p-10 text-xl font-bold">Logo</div>

			<div className=" flex flex-[3_2_0%] flex-col justify-center ">
				<div className="flex  ">
					<p className="text-xs text-secondGrey">Hi, Jessica</p>
				</div>
				<div className="flex">
					<h2 className="text-2xl font-bold text-White">Welcome Back</h2>
				</div>
			</div>
			<div className=" flex flex-1 items-center justify-end ">
				<WalletButton />
			</div>
		</div>
	);
}

export default Header;
