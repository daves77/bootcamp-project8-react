/* react imports */
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/dashboard";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Create from "./pages/Create";
import UserCollection from "./pages/UserCollection";
import UserProfile from "./pages/UserProfile";
/* 
1. react-helmet-async used to manipulate tags in head section of html doc 
2. in this context used to update title tag for different pages, so helmet element only used in ./components/Page
*/
import { HelmetProvider } from "react-helmet-async";
/* mui imports */
import ThemeConfig from "./theme";

function App() {
  /* 
	1. code below sets up listening for changes in blockchain network or metamask account connected in the app
	2. once change detected, reloads the entire app => user have to click on reconnect wallet in app again
	3. using Metamask provided windows.ethereum API and not ethers.js cos ethers.js does not seem to provide a means to listen out for account changes 
	*/
  if (window.ethereum) {
    const getAccount = async () => {
      const account = await window.ethereum.request({
        method: "eth_accounts",
      });
      window.ethereum.on("chainChanged", () => {
        if (account.length > 0) {
          window.location.assign("/");
        }
      });

      window.ethereum.on("accountsChanged", () => {
        if (account.length > 0) {
          window.location.assign("/");
        }
      });
    };

    getAccount();
  }

  return (
    <HelmetProvider>
      <ThemeConfig>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/create" element={<Create />} />
            <Route path="/user" element={<UserCollection />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </DashboardLayout>
      </ThemeConfig>
    </HelmetProvider>
  );
}

export default App;
