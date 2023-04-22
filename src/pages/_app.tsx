import '@/styles/globals.css'
import type { AppProps } from 'next/app'

// components
import RootLayout from '@/components/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  )
}