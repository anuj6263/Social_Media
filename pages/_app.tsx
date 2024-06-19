import Layout from '@/components/Layout'
import '@/styles/globals.css'

import {SessionProvider} from 'next-auth/react'
import { Toaster } from 'react-hot-toast'
import type { AppProps } from 'next/app'
import Modal from '@/components/Modal'
import RegisterModal from '@/components/modals/RegisterModal'
import LoginModal from '../components/modals/LoginModal'
import EditModal from '@/components/modals/EditModal'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.sesion}>
      <Toaster/>
      <EditModal/>
    <RegisterModal/>
    <LoginModal/>
    {/* <Modal actionLabel='Submit' isOpen title='Test model'/> */}
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </SessionProvider>
  )
}
