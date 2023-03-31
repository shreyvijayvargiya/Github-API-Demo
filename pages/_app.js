import React, { useEffect } from "react";
import { theme } from "utils/theme";
import { ThemeProvider } from "@mui/material/styles";
import { Body } from "modules";
import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import "../styles.css";

function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider theme={theme}>
			<Body pageProps={pageProps}>
				<Component {...pageProps} />
			</Body>
		</ThemeProvider>
	);
}

export default MyApp;
