import '../styles/globals.css'
import { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import Cookies from 'js-cookie'

import { darkTheme, lightTheme, customTheme } from '../themes'
import { Themes } from './theme-changer'

function MyApp({ Component, pageProps }: AppProps) {
  const [currentTheme, setCurrentTheme] = useState(lightTheme)

  useEffect(() => {
    const cookieTheme = Cookies.get('theme') || Themes.LIGHT
    const selectedTheme =
      cookieTheme === Themes.LIGHT
        ? lightTheme
        : cookieTheme === Themes.DARK
        ? darkTheme
        : customTheme

    setCurrentTheme(selectedTheme)
  }, [])

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
