import React from 'react'
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
   static async getInitialProps(ctx) {
      const sheets = new ServerStyleSheet();
      const originalRenderPage = ctx.renderPage;

      ctx.renderPage = () => 
         originalRenderPage({ 
            enhanceApp: (App) => (props) => sheets.collectStyles(<App {...props} />)
         })

      const initialProps = await Document.getInitialProps(ctx);
      const styleTags = sheets.getStyleElement();

      return {
         ...initialProps,
         styles: [ 
            ...React.Children.toArray(initialProps.styles), 
            styleTags
         ],
      }
   }

   render() {
      return (
         <Html>
            <Head>
               {this.props.styles}
            </Head>
            <body>
               <Main />
               <NextScript />
            </body>
         </Html>
      )
   }
}
