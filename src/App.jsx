import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import ThemeConfig from './theme';
import DashboardLayout from './layouts/dashboard';
import { MarketplaceProvider } from './store';

import Home from './pages/Home';
import Marketplace from './pages/Marketplace';

function App() {
	return (
		<HelmetProvider>
			<MarketplaceProvider>
				<ThemeConfig>
					<DashboardLayout>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/marketplace' element={<Marketplace />} />
						</Routes>
					</DashboardLayout>
				</ThemeConfig>
			</MarketplaceProvider>
		</HelmetProvider>
	);
}

export default App;
