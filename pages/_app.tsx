import CssBaseline from "@mui/material/CssBaseline"
import createTheme from "@mui/material/styles/createTheme"
import ThemeProvider from "@mui/material/styles/ThemeProvider"
import type { AppProps } from 'next/app'
import Head from "next/head"
import 'xterm/css/xterm.css'

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f7f8fb"
    }
  },
  typography: {
    fontFamily: "Rubik, sans-serif",
  }
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>Vivo</title>
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
