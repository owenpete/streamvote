import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import Navbar from '../components/Navbar';
import ChatBox from '../components/ChatBox';

import { useEffect, useState } from 'react';
import { messages } from '../utils/tmi'; 
import Leaderboard from '../components/Leaderboard';
import Timer from '../components/Timer';

interface ChatData{
  messages: any[];
}

const Home: NextPage = () => {
  const [chatData, setChatData] = useState<ChatData | undefined>(undefined);
  const [voteCategories, setVoteCategories] = useState<any>([]);
  const [leaderboard, setLeaderboard] = useState<any>([]);
  const [isTimerRunning, setTimer] = useState<boolean>(false);
  useEffect(()=>{
    let timerFunc = setInterval(() => {
        setChatData({
          messages: messages
        });
    }, 1000);
    return () => clearInterval(timerFunc)
  });

  return (
    <div className='index'>
      <Head>
        <title>Stream Vote</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, maximum-scale=1, maximum-scale=1.0, user-scalable=0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main">
        <Timer
          isRunning={isTimerRunning}
          setTimer={setTimer}
        />
        <Leaderboard 
          leaderboard={['first', 'second']}
        />
        <div className='main__left'>
        </div>
        <div className="main__center">
          <ChatBox 
            chatData={chatData}
          /> 
        </div>
        <div className='main__right'>

        </div>
      </div>
    </div>
  )
}

export default Home;
