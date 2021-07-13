import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from '../src/lib/AlurakutCommons'

const GlobalStyle = createGlobalStyle `
  /* RESET CSS */

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    background-color: #D9E6F6;
  }

  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  ${AlurakutStyles}
`

const theme = {
    colors: {
        primary: '#0070f3',
    },
}

export default function App({ Component, pageProps }) {
    return ( <
        >
        <
        GlobalStyle / >
        <
        ThemeProvider theme = { theme } >
        <
        Component {...pageProps }
        /> < /
        ThemeProvider > <
        />
    )
}