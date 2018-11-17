import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <Container>
          <Head>
            {/* Import Roboto font */}
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/>
            {/* Import Google Icon Font */}
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
            {/* <!--Import materialize.css--> */}
            <link type="text/css" rel="stylesheet" href="/static/css/materialize.min.css"  media="screen,projection"/>
            {/* <!--Let browser know website is optimized for mobile--> */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta name="theme-color" content="#4db6ac" />
          </Head>
        <Component {...pageProps} />
      </Container>
    )
  }
}