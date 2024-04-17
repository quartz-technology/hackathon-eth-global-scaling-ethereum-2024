import '../styles/globals.css';

import { AppProps } from 'next/app';

import { CompileProvider } from '@/contexts/CompileContext';
import { WalletProvider } from '@/contexts/WalletContext';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<WalletProvider>
			<CompileProvider>
				<Component {...pageProps} />
			</CompileProvider>
		</WalletProvider>
	);
}

export default MyApp;
