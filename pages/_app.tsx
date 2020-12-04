import React, { Fragment, useEffect } from 'react'
// import App from 'next/app'
import { ThemeProvider } from 'styles/styled'
import theme from 'styles/theme'
import BasePage from 'components/BasePage'
import BaseLayout from 'components/layouts'
import { GlobalStyles } from 'styles/global'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'styles/scss/index.scss'

const MyApp = ({Component, pageProps}) => {
   
   useEffect(() => {
      const jssStyles = document.querySelector('#jss-server-side');
      if( jssStyles && jssStyles.parentNode) {
         jssStyles.parentNode.removeChild(jssStyles);
      }
   }, []);
   return (
      <Fragment>
         <GlobalStyles />
         <ThemeProvider theme={theme}>
            <BaseLayout>
               <BasePage>
                  <Component {...pageProps} />
               </BasePage>
            </BaseLayout>
         </ThemeProvider>
      </Fragment>
   )
}

export default MyApp


