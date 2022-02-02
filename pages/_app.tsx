import Router from "next/router";
import NProgress from "nprogress";
import "../styles/nprogress.scss";

import '../styles/globals.css';
import '../styles/index.scss';
import '../styles/main.scss';
import '../styles/chatbox.scss';
import '../styles/navbar.scss';
import '../styles/voteItem.scss';
import '../styles/timer.scss';
import '../styles/leaderboard.scss';
import '../styles/voteControls.scss';
import '../styles/newCategoryPopup.scss';
import '../styles/newChannelPopup.scss';
import '../styles/mainMenu.scss';
import type { AppProps } from 'next/app'

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div id="dimmer"></div>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
