// Supposons que ce soit dans votre fichier où vous configurez et utilisez EthersAdapter
import { EthersAdapter, SafeFactory } from '@safe-global/protocol-kit';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';

import initSafeAuthPack from './safeAuth';

const createSafe = async () => {
	const authResult = await initSafeAuthPack();
	if (!authResult) {
		toast.error('Authentication initialization failed. Please try again.');
		return null;
	}

	const { safeAuthPack, signInInfo } = authResult;

	if (!signInInfo?.eoa) {
		console.error('No EOA (Externally Owned Account) available to create a Safe.');
		toast.error('No EOA available. Please connect your wallet.');
		return null;
	}

	try {
		const eip1193Provider = safeAuthPack.getProvider();
		if (!eip1193Provider) {
			console.error('No EIP-1193 provider available from SafeAuthPack');
			toast.error('Failed to obtain a valid provider. Please check your wallet connection.');
			return null;
		}

		const provider = new ethers.BrowserProvider(eip1193Provider);
		const signer = await provider.getSigner();

		const ethAdapter = new EthersAdapter({
			ethers,
			signerOrProvider: signer,
		});

		const safeFactory = await SafeFactory.create({ ethAdapter });
		const safe = await safeFactory.deploySafe({
			safeAccountConfig: { threshold: 1, owners: [signInInfo.eoa] },
		});

		const safeAddress = await safe.getAddress();
		console.log('SAFE Created!', safeAddress);
		toast.success('Safe created successfully!');
		return safeAddress;
	} catch (error) {
		console.error('Failed to create Safe:', error);
		toast.error('Failed to create Safe. Please try again.');
		return null;
	}
};

export default createSafe;
