import "../styles/globals.css";
import { NavBar } from "../components/componentsindex";
import {NFTMarketplaceProvider } from "../Context/NFTMarketplaceContext";


const MyApp = ({ Component, pageProps }) => (

  (<div style={{padding:'2.5vw'}}>
    <NFTMarketplaceProvider>
      <NavBar/>
      <Component {...pageProps} />
    </NFTMarketplaceProvider>

  </div>)
);

export default MyApp;

/*import "../styles/globals.css";

//INTRNAL IMPORT
import { NavBar, Footer } from "../components/componentsindex";
import {NFTMarketplaceProvider} from "../Context/NFTMarketplaceContext";
const MyApp = ({ Component, pageProps }) => (
  <div>
    <NFTMarketplaceProvider>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </NFTMarketplaceProvider>
  </div>
);

export default MyApp;*/