import '../styles/globals.css';

import { AppProps } from 'next/app';

import { IDEProvider } from '@/contexts/IDEContext';
import { WalletProvider } from '@/contexts/WalletContext';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<WalletProvider>
			<IDEProvider>
				<Component {...pageProps} />
			</IDEProvider>
		</WalletProvider>
	);
}

export default MyApp;
