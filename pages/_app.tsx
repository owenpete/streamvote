import '../styles/globals.css';
import '../styles/index.scss';
import '../styles/chatbox.scss';
import '../styles/navbar.scss';
import '../styles/voteItem.scss';
import '../styles/timer.scss';
import '../styles/leaderboard.scss';
import '../styles/voteControls.scss';
import '../styles/newCategoryPopup.scss';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div id="dimmer"></div>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
