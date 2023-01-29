import React from 'react'

const GoogleAnalytics = () => {
  return <>
  <script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.REACT_APP_GOOGLE_ANALYTICS}`} />

  <script strategy="lazyOnload" id='google'>
      {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.REACT_APP_GOOGLE_ANALYTICS}', {
          page_path: window.location.pathname,
          });
      `}
  </script>
  </>
}

export default GoogleAnalytics