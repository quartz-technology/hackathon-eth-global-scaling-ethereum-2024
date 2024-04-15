// utils/safeAuth.ts
import { AuthKitSignInData, SafeAuthInitOptions, SafeAuthPack } from '@safe-global/auth-kit';
import { toast } from 'react-toastify'; // Assurez-vous d'installer react-toastify si nécessaire

const initSafeAuthPack = async (): Promise<
	{ safeAuthPack: SafeAuthPack; signInInfo?: AuthKitSignInData } | undefined
> => {
	const safeAuthInitOptions: SafeAuthInitOptions = {
		showWidgetButton: true,
		enableLogging: true,
		buttonPosition: 'top-right',
		buildEnv: 'production',
		chainConfig: {
			chainId: '0x64',
			displayName: 'Gnosis',
			rpcTarget: 'https://gnosis.drpc.org',
			blockExplorerUrl: 'https://gnosisscan.io/',
			ticker: 'xDAI',
			tickerName: 'Gnosis Chain',
		},
	};

	const safeAuthPack = new SafeAuthPack();

	try {
		await safeAuthPack.init(safeAuthInitOptions);

		if (safeAuthPack.isAuthenticated) {
			const signInInfo = await safeAuthPack.signIn();
			console.log('Initialization and auto-login successful!', signInInfo);
			return { safeAuthPack, signInInfo };
		}
		toast.info('Authentication needed');
		return { safeAuthPack, signInInfo: undefined };
	} catch (error) {
		console.error('Failed to initialize SafeAuthPack, try again!', error);
		toast.error('Failed to initialize SafeAuthPack, try again!');
		return undefined;
	}
};

export default initSafeAuthPack;
