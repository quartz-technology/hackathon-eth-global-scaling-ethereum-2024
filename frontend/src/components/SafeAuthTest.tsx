// TODO: SafeAuth with only google :(
import { SafeAuthPack } from '@safe-global/auth-kit';
import { EthersAdapter, SafeFactory } from '@safe-global/protocol-kit';
import { BrowserProvider, Eip1193Provider, ethers } from 'ethers';
import React, { useEffect, useState } from 'react';

const SafeAuthComponent = () => {
	const [safeAuthPack, setSafeAuthPack] = useState<SafeAuthPack | null>(null);
	const [userAddress, setUserAddress] = useState('');
	const [safeAddress, setSafeAddress] = useState('');

	useEffect(() => {
		const initSafeAuth = async () => {
			const SAP = new SafeAuthPack();
			const safeAuthInitOptions = {
				showWidgetButton: false,
				chainConfig: {
					blockExplorerUrl: 'https://sepolia.etherscan.io',
					chainId: '0xaa36a7',
					displayName: 'Ethereum Sepolia',
					rpcTarget: 'https://rpc.ankr.com/eth_sepolia',
					ticker: 'ETH',
					tickerName: 'Ethereum',
				},
			};
			await SAP.init(safeAuthInitOptions);
			setSafeAuthPack(SAP);
		};

		initSafeAuth();
	}, []);

	const signIn = async () => {
		if (!safeAuthPack) return;
		const response = await safeAuthPack.signIn();
		setUserAddress(response.eoa);
	};

	const createSafe = async () => {
		if (!safeAuthPack || !userAddress) return;
		const provider = new BrowserProvider(safeAuthPack?.getProvider() as Eip1193Provider);
		const signer = await provider.getSigner();
		const ethAdapter = new EthersAdapter({
			// @ts-expect-error TODO
			ethers,
			// @ts-expect-error TODO
			signerOrProvider: signer,
		});
		const safeFactory = await SafeFactory.create({ ethAdapter });
		const safe = await safeFactory.deploySafe({
			safeAccountConfig: { threshold: 1, owners: [userAddress] },
		});
		setSafeAddress(await safe.getAddress());
	};

	const signOut = async () => {
		if (!safeAuthPack) return;
		await safeAuthPack.signOut();
		setUserAddress('');
		setSafeAddress('');
	};

	return (
		<div>
			<h1>Safe Authentication</h1>
			{userAddress ? (
				<div>
					<p>Signed in with address: {userAddress}</p>
					<button onClick={createSafe}>Create Safe</button>
					<button onClick={signOut}>Sign Out</button>
					{safeAddress && <p>Safe Created at: {safeAddress}</p>}
				</div>
			) : (
				<button onClick={signIn}>Sign In</button>
			)}
		</div>
	);
};

export default SafeAuthComponent;
