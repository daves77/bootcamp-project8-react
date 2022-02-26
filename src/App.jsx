import React from 'react';
import { Routes, Route } from 'react-router-dom';
/* 
1. react-helmet-async used to manipulate tags in head section of html doc 
2. in this context used to update title tag for different pages, so helmet element only used in ./components/Page
*/
import { HelmetProvider } from 'react-helmet-async';

import ThemeConfig from './theme';
import DashboardLayout from './layouts/dashboard'; // file not specified, will look for index.jsx by default 
import { MarketplaceProvider } from './store';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace'; // file not specified, will look for index.jsx by default

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
