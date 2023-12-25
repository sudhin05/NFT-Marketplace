import "../styles/globals.css";
import { NavBar } from "../components/componentsindex";
import { NFTMarketplaceConnect, NFTMarketplaceProvider } from "../connect/NFTMarketplaceConnect";


const MyApp = ({ Component, pageProps }) => (

  (<div style={{padding:'2.5vw'}}>
    <NFTMarketplaceProvider />
    <NavBar/>
    <Component {...pageProps} />
    <NFTMarketplaceProvider />

  </div>)
);

export default MyApp;