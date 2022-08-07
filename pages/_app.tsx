import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import AdminContext from '../context/AdminContext'
import { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function MyApp({ Component, pageProps }: AppProps) {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LocalizationProvider>
    </AdminContext.Provider>
  )
}

export default MyApp
