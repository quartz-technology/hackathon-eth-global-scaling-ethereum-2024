import WalletConnectSignal from '@/assets/WalletConnectSignal.svg';
import { useWeb3Context } from '@/contexts/WalletContext';

function WalletButon() {
	const { account, isLogged, web3Service } = useWeb3Context();

	// TODO: remove just for testing
	function uiConsole(...args: any[]): void {
		const el = document.querySelector('#console>p');
		if (el) {
			el.innerHTML = JSON.stringify(args || {}, null, 2);
		}
		console.log(...args);
	}

	const handleLogin = async () => {
		if (!isLogged.setValue) return;

		const isConnected = await web3Service.login();
		isLogged.setValue(isConnected);

		if (isConnected) {
			const c = await web3Service.getAccounts();
			if (account.setValue) {
				account.setValue(c[0]);
			}
		}
	};

	const handleLogout = async () => {
		if (!isLogged.setValue) return;

		await web3Service.logout();
		isLogged.setValue(false);
		// setBalance('0');
		if (account.setValue) {
			account.setValue('');
		}
		console.log(account.value);
		uiConsole();
	};

	const handleSign = async () => {
		const ok = await web3Service.signMessage('ok');
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
			<div className="flex max-w-56 items-center justify-center  rounded-sm  bg-gradient-to-r from-orange-500 to-purple-500 p-px">
				<div className="m-px flex flex-row gap-5 rounded-lg bg-black p-2">
					<div className="flex" onClick={handleGetUserInfo}>
						User Info
					</div>
					{/* <div className="flex">
					<button onClick={handleGetAccounts} className="card">
						Get Accounts
					</button>
				</div> */}
					<div className="flex" onClick={handleBalance}>
						Get Balance
					</div>
					{/* <div className="flex" onClick={handleSign}>
						Sign Message
					</div> */}
					<div className="flex">
						<button onClick={handleLogout}>Log Out</button>
					</div>
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

			{isLogged.value ? (
				<>{loggedInView}</>
			) : (
				<button
					type="button"
					onClick={handleLogin}
					className="flex items-center justify-center  rounded-full bg-gradient-to-r from-orange-500 to-purple-500 p-px"
				>
					<div className="m-px flex size-full items-center justify-center rounded-full bg-black p-2 text-lg  text-white hover:bg-grey">
						<WalletConnectSignal className="mr-1 size-7 fill-White" aria-hidden="true" />
						Wallet
					</div>
				</button>
			)}
		</>
	);
}

export default WalletButon;
