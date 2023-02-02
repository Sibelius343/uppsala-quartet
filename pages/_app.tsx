import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import AdminContext from '../context/AdminContext'
import { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import NotificationContext from '../context/NotificationContext'
import useLocalStorage from '../hooks/useLocalStorage'

function MyApp({ Component, pageProps }: AppProps) {
  const [localValue] = useLocalStorage('catena_admin', false);
  const [isAdmin, setIsAdmin] = useState(localValue);
  const [notificationMessage, setNotificationMessage] = useState('');

  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
      <NotificationContext.Provider value={{ notificationMessage, setNotificationMessage }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </LocalizationProvider>
      </NotificationContext.Provider>
    </AdminContext.Provider>
  )
}

export default MyApp
