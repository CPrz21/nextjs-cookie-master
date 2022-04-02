import { ChangeEvent, useEffect, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import Cookies from 'js-cookie'
import axios from 'axios'

import { Layout } from '../components/layouts'

export enum Themes {
  LIGHT = 'light',
  DARK = 'dark',
  CUSTOM = 'custom',
}

interface Props {
  theme: string
}

const ThemeChangerPage: NextPage<Props> = ({ theme }) => {
  const [currentTheme, setCurrentTheme] = useState(theme)

  const onThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedTheme = event.target.value

    setCurrentTheme(selectedTheme)

    Cookies.set('theme', selectedTheme)
  }

  const onClick = async () => {
    const { data } = await axios.get('/api/hello')
    console.log('🚀 ~ file: theme-changer.tsx ~ line 32 ~ onClick ~ resp', data)
  }

  useEffect(() => {
    setCurrentTheme(Cookies.get('theme') || Themes.LIGHT)
  }, [])

  return (
    <Layout>
      <Card>
        <CardContent>
          <FormControl>
            <FormLabel>Theme</FormLabel>
            <RadioGroup value={currentTheme} onChange={onThemeChange}>
              <FormControlLabel
                value={Themes.LIGHT}
                control={<Radio />}
                label="Light"
              />
              <FormControlLabel
                value={Themes.DARK}
                control={<Radio />}
                label="Dark"
              />
              <FormControlLabel
                value={Themes.CUSTOM}
                control={<Radio />}
                label="Custom"
              />
            </RadioGroup>
          </FormControl>
          <Button onClick={onClick}>Request</Button>
        </CardContent>
      </Card>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { theme = Themes.LIGHT } = req.cookies

  const validThemes: string[] = Object.values(Themes).map((theme) => theme)

  return {
    props: {
      theme: validThemes.includes(theme) ? theme : Themes.DARK,
    },
  }
}

export default ThemeChangerPage
