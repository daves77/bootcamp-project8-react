import React, { useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
/* 
1. react-helmet-async used to manipulate tags in head section of html doc 
2. in this context used to update title tag for different pages, so helmet element only used in ./components/Page
*/
import { HelmetProvider } from 'react-helmet-async';
import { ethers } from 'ethers';

import ThemeConfig from './theme';
import DashboardLayout from './layouts/dashboard'; // file not specified, will look for index.jsx by default
import {
	Context,
	userSignIn,
	createMktProviderContract,
	createNftProviderContract,
} from './store';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace'; // file not specified, will look for index.jsx by default
import Create from './pages/Create';
import UserCollection from './pages/UserCollection';

import MarketListing from './contracts/MarketListing.json';
import NFT from './contracts/NFT.json';
import { mktAdd, nftAdd } from './contracts/addressSetting.js';

function App() {
	const { store, dispatch } = useContext(Context);
	console.log('store', store);
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
			if (account.length > 0) {
				// find if user address recorded in the db
				// else make pop up and ask username
				signer = provider.getSigner();
				dispatch(
					userSignIn({ userAddress: await signer.getAddress(), name: 'david' })
				);

			} else {
				signer = provider;
				console.log('provider', signer);
			}
			let mktContractProvider = new ethers.Contract(
				mktAdd,
				MarketListing.abi,
				signer
			);
			let nftContractProvider = new ethers.Contract(nftAdd, NFT.abi, signer);
			dispatch(createMktProviderContract({ mktContractProvider }));
			dispatch(createNftProviderContract({ nftContractProvider }));

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
						<Route path='/' element={<Home />} />
						<Route path='/marketplace' element={<Marketplace />} />
						<Route path='/create' element={<Create />} />
						<Route path='/user' elemment={<UserCollection />} />
					</Routes>
				</DashboardLayout>
			</ThemeConfig>
		</HelmetProvider>
	);
}

export default App;
