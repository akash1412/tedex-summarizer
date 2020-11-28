import "../styles/index.css";

import GlobalContextProvider from "../context/context";

function MyApp({ Component, pageProps }) {
	return (
		<GlobalContextProvider>
			<Component {...pageProps} />;
		</GlobalContextProvider>
	);
}

export default MyApp;
