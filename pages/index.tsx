import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import Navbar from '../components/Navbar';

import { useEffect, useState } from 'react';
import tmi from 'tmi.js';
import msgs from '../utils/tmi'; 

const Home: NextPage = () => {
  const [messages, setMessages] = useState<any>({messages: []});
  useEffect(()=>{
    let timerFunc = setInterval(() => {
        setMessages({messages: msgs});
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
      <Navbar 
        isLoggedIn={false}
      />
      <div style={{padding: '5rem', color: 'white'}}>
        {
          messages.messages.map((value: any, index: number)=>{
            return (
              <span key={index}>{value}<br/></span>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home;
