import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect } from 'react'

const GA_TRACKING_ID = (locale) => {
	switch (locale) {
		case 'en':
			return process.env.NEXT_PUBLIC_GA_ID_EN
		case 'tr':
			return process.env.NEXT_PUBLIC_GA_ID_TR
		default:
			break
	}
}

function GoogleAnalytics() {
	const router = useRouter()
	const { locale } = router

	useEffect(() => {
		const handleRouteChange = (url) => {
			if (window && window.gtag) {
				window.gtag('config', GA_TRACKING_ID(locale), {
					page_path: url,
					page_location: url,
				})
			}
		}

		router.events.on('routeChangeComplete', handleRouteChange)
    		router.events.on('hashChangeComplete', handleRouteChange)
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange)
      			router.events.off('hashChangeComplete', handleRouteChange)
		}
	}, [locale, router])

	return (
		<>
			<Script
				strategy='afterInteractive'
				src={
					'https://www.googletagmanager.com/gtag/js?id=' +
					GA_TRACKING_ID(locale)
				}
			/>

			<Script strategy='afterInteractive' id='google-analytics'>
				{`  
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config','${GA_TRACKING_ID(locale)}', {
                    page_path: '${router.pathname}',
                    page_location: '${router.pathname}',
                });
                `}
			</Script>
		</>
	)
}

export default GoogleAnalytics
