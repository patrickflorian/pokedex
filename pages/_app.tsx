import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../src/layout';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Loader } from 'components';


function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const handleRouteChange = (url: string, { shallow }: any) => {
      setLoading(true)
      console.log(
        `App is changing to ${url} ${shallow ? 'with' : 'without'
        } shallow routing`
      )
    }
    const handleRouteComplete = (url: string, { shallow }: any) => {
      setLoading(false)
      console.log('you have finished going to the new page')
    }
    const handleRouteChangeError = (url: string, { shallow }: any) => {
      setLoading(false)
      console.log('error going to new page')
    }
    router.events.on('routeChangeStart', handleRouteChange)
    router.events.on('routeChangeComplete', handleRouteComplete)// If the component is unmounted, unsubscribe

    router.events.on('routeChangeError', handleRouteChangeError)
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  return <Layout>
    {loading ? <div className='w-full items-center justify-center flex min-h-screen '><Loader /></div>
      : <Component {...pageProps} />}
  </Layout>
}

export default MyApp
