import GoogleAnalytics from './GoogleAnalythics'

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
  
	return (
  <>
    <GoogleAnalytics />
    <Component {...pageProps} />
  </>
	)
}
