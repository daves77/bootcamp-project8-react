/* react imports */
import { useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ethers } from 'ethers';
import { HelmetProvider } from 'react-helmet-async';
import axios from 'axios';

import DashboardLayout from './layouts/dashboard';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Create from './pages/Create';
import UserCollection from './pages/UserCollection';
import UserProfile from './pages/UserProfile';
import { Context, createContracts, userSignIn } from './store';

import MarketListing from './contracts/MarketListing.json';
import NFT from './contracts/NFT.json';
import { mktAdd, nftAdd } from './contracts/addressSetting.js';

/* 
1. react-helmet-async used to manipulate tags in head section of html doc 
2. in this context used to update title tag for different pages, so helmet element only used in ./components/Page
*/
/* mui imports */
import ThemeConfig from './theme';

function App() {
	const { dispatch, store } = useContext(Context);
	/* 
	1. code below sets up listening for changes in blockchain network or metamask account connected in the app
	2. once change detected, reloads the entire app => user have to click on reconnect wallet in app again
	3. using Metamask provided windows.ethereum API and not ethers.js cos ethers.js does not seem to provide a means to listen out for account changes 
	*/
	useEffect(() => {
		(async () => {
			// returns a list of account
			const account = await window.ethereum.request({
				method: 'eth_accounts',
			});
			console.log('accounts', account);

			const provider = new ethers.providers.Web3Provider(
				window.ethereum,
				'any'
			);

			/* 
			this chunk of code checks to see if theres a account linked to metamask
			and assigns and creates the contract respectively
			*/
			let signer;
			let user = {};
			if (account.length > 0) {
				// find if user address recorded in the db
				// else make pop up and ask username
				signer = provider.getSigner();
				const userAddress = await signer.getAddress();
				const result = await axios.get(`http://localhost:3004/${userAddress}`);
				user = { userName: result.data.userName, userAddress };
			} else {
				signer = provider;
				console.log('provider', signer);
        user = null
			}
			let marketContract = new ethers.Contract(
				mktAdd,
				MarketListing.abi,
				signer
			);
			let nftContract = new ethers.Contract(nftAdd, NFT.abi, signer);
			dispatch(userSignIn(user , nftContract, marketContract));

			window.ethereum.on('chainChanged', () => {
				console.log('chain changed');
			});

			window.ethereum.on('accountsChanged', () => {
				console.log('accounts changed');
			});
		})();
	}, [dispatch]);

	return (
		<HelmetProvider>
			<ThemeConfig>
				<DashboardLayout>
					<Routes>
						<Route path='/' element={<UserCollection />} />
						<Route path='/marketplace' element={<Marketplace />} />
						<Route path='/create' element={<Create />} />
						<Route path='/user' element={<UserCollection />} />
						<Route path='/profile' element={<UserProfile />} />
					</Routes>
				</DashboardLayout>
			</ThemeConfig>
		</HelmetProvider>
	);
}

export default App;
