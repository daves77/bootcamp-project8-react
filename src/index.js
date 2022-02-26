import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import { MarketplaceProvider } from './store';

ReactDOM.render(
	<MarketplaceProvider>
		<Router>
			<App />
		</Router>
	</MarketplaceProvider>,
	document.getElementById('root')
);
