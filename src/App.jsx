import React, {useEffect, useContext} from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import {ethers} from 'ethers'

import ThemeConfig from './theme';
import DashboardLayout from './layouts/dashboard';

import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Create from './pages/Create'
import {Context, userSignIn} from './store'


function App() {
	const { dispatch} = useContext(Context)
	useEffect(() => {
		( async () => {

			// returns a list of account	
			const account = await window.ethereum.request({
				method: "eth_accounts"
			})
			console.log("accounts", account)
			if (account.length > 0) {
				// find if user address recorded in the db
				// else make pop up and ask username
				dispatch(userSignIn({userAddress: account[0], name: "david"}))
			}


			window.ethereum.on("chainChanged", () => {
				console.log("chain changed")
			})

			window.ethereum.on("accountsChanged", () => {
				console.log("accounts changed")
			})
		})()
	}, [])
	return (
		<HelmetProvider>
				<ThemeConfig>
					<DashboardLayout>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/marketplace' element={<Marketplace />} />
							<Route path='/create' element={<Create />} />
						</Routes>
					</DashboardLayout>
				</ThemeConfig>
		</HelmetProvider>
	);
}

export default App;
