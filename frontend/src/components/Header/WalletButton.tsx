import { CHAIN_NAMESPACES, CustomChainConfig } from '@web3auth/base';
import { useEffect, useState } from 'react';

import WalletConnectSignal from '@/assets/WalletConnectSignal.svg';
import Web3AuthService from '@/services/web3Auth';

const CLIENT_ID = 'BB6QXZ9Qvas6GePF8qeJSi40B7-Lt4MzmmfzhDXeT9BmVERVGkphW6NVtBMHuxQQMMqjy3j8gOesXrN9S5WeFG4'; // get from https://dashboard.web3auth.io

const CHAIN_CONFIG: CustomChainConfig = {
	chainId: '0x1',
	rpcTarget: 'https://rpc.ankr.com/eth',
	chainNamespace: CHAIN_NAMESPACES.EIP155,
	displayName: 'Ethereum Mainnet',
	blockExplorerUrl: 'https://etherscan.io/',
	ticker: 'ETH',
	tickerName: 'Ethereum',
	logo: 'https://images.toruswallet.io/eth.svg',
};

function WalletButon() {
	const [web3Service] = useState(new Web3AuthService(CLIENT_ID, CHAIN_CONFIG));
	const [loggedIn, setLoggedIn] = useState(false);
	const [balance, setBalance] = useState('0');

	useEffect(() => {
		const init = async () => {
			await web3Service.initWeb3Auth();
		};

		init();
	}, [web3Service]);

	// TODO: remove just for testing
	function uiConsole(...args: any[]): void {
		const el = document.querySelector('#console>p');
		if (el) {
			el.innerHTML = JSON.stringify(args || {}, null, 2);
		}
		console.log(...args);
	}

	const handleLogin = async () => {
		const isConnected = await web3Service.login();
		setLoggedIn(isConnected);
		if (isConnected) {
			const b = await web3Service.getBalance();
			setBalance(b);
		}
	};

	const handleLogout = async () => {
		await web3Service.logout();
		setLoggedIn(false);
		setBalance('0');
		uiConsole();
	};

	const handleSign = async () => {
		const ok = await web3Service.signMessage('ok');
		uiConsole(ok);
	};

	const handleGetAccounts = async () => {
		const ok = await web3Service.getAccounts();
		uiConsole(ok);
	};

	const handleGetUserInfo = async () => {
		const ok = await web3Service.getUserInfo();
		uiConsole(ok);
	};

	const handleBalance = async () => {
		const ok = await web3Service.getBalance();
		uiConsole(ok);
	};

	const loggedInView = (
		<>
			<div className="m-px flex flex-row gap-5 rounded-lg bg-black p-2">
				<div className="flex">
					<button onClick={handleGetUserInfo} className="card">
						User Info
					</button>
				</div>
				<div className="flex">
					<button onClick={handleGetAccounts} className="card">
						Get Accounts
					</button>
				</div>
				<div className="flex">
					<button onClick={handleBalance} className="card">
						Get Balance
					</button>
				</div>
				<div className="flex">
					<button onClick={handleSign} className="card">
						Sign Message
					</button>
				</div>
				<div className="flex">
					<button onClick={handleLogout} className="card">
						Log Out
					</button>
				</div>
			</div>
		</>
	);

	// const unloggedInView = (
	// 	<button onClick={login} className="card">
	// 		Login
	// 	</button>
	// );

	return (
		<>
			<div id="console" style={{ whiteSpace: 'pre-line' }}>
				<p style={{ whiteSpace: 'pre-line' }}></p>
			</div>
			<button
				type="button"
				onClick={handleLogin}
				className={`flex items-center justify-center  ${loggedIn ? 'rounded-sm' : 'rounded-full'} bg-gradient-to-r from-orange-500 to-purple-500 p-px`}
			>
				{loggedIn ? (
					<>{loggedInView}</>
				) : (
					<div className="m-px flex size-full items-center justify-center rounded-full bg-black p-2 text-lg  text-white hover:bg-grey">
						<WalletConnectSignal className="mr-1 size-7 fill-White" aria-hidden="true" />
						Wallet
					</div>
				)}
			</button>
		</>
	);
}

export default WalletButon;
