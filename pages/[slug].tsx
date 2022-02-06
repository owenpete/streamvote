import { lazy, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import Navbar from '../components/Navbar';
import ChatBox from '../components/ChatBox';
import Leaderboard from '../components/Leaderboard';
import Timer from '../components/Timer';
import VoteControls from '../components/VoteControls';
import NewCategoryPopup from '../components/NewCategoryPopup';
import VoteItem from '../components/VoteItem';
import MainMenu from '../components/MainMenu';

import { tmiGetCategories, tmiAddCategory, tmiAddCategoryAtIndex, tmiRemoveCategory, tmiGetMessages, tmiSetIsVoting, tmiGetIsVoting, tmiSetPrefix, tmiSetCategory, tmiGetCurrentChannel, tmiSetCurrentChannel, tmiConnect, tmiGetReadyState, tmiDisconnect } from '../utils/tmi'; 
import { FiEdit, FiMenu, FiSettings } from 'react-icons/fi';
import NewChannelPopup from '../components/NewChannelPopup';

interface Props{
  channel: string;
}

interface ChatData{
  messages: any[];
}

export const getServerSideProps = async({ query }: { query: any }) =>{
  const channel: string = query.slug;
  return {
    props: {
      channel: channel
    }
  }
}

const Home = (props: Props) => {
  const [chatData, setChatData] = useState<ChatData | undefined>(undefined);
  const [votingCategories, setVotingCategories] = useState<any>([]);
  const [currentChannel, setCurrentChannel] = useState<string>('');
  const [isSettingNewChannel, setIsSettingNewChannel] = useState<boolean>(false);
  const [leaderboard, setLeaderboard] = useState<any>([]);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [slotIndex, setSlotIndex] = useState<number | undefined>(undefined);
  const [isVoting, setIsVoting] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [prefix, setPrefix] = useState<string>('#');
  const categoryOptions = [2, 4, 6, 8];

  const [categoryGridSize, setCategoryGridSize] = useState<any>(categoryOptions[0]);
  const [windowSize, setWindowSize] = useState<number>();

  const handleFilter = (categoryCount: string) =>{
    setCategoryGridSize(+categoryCount);
  }

  const updateLeaderboard = (categories: any) =>{
    const categoryCopy = [...categories];
    const topCategories = categoryCopy.sort((a: any, b: any)=>{
      return b.votes.length - a.votes.length;
    });
    setLeaderboard(topCategories);
  }

  useEffect(()=>{
    setCurrentChannel(props.channel);
    tmiSetCurrentChannel(props.channel);
    tmiConnect();
  }, []);

  useEffect(()=>{
    let timerFunc = setInterval(() => {
      // spreading data to trigger state update
      setChatData({
        messages: [...tmiGetMessages()]
      });
      setVotingCategories([...tmiGetCategories()]);
      setCurrentChannel(tmiGetCurrentChannel());
    }, 1000);
    return () => clearInterval(timerFunc)
  });

  useEffect(()=>{
    // updates backend data when fontend category is added
    tmiSetCategory(votingCategories);
    updateLeaderboard(votingCategories);
  }, [votingCategories])

  useEffect(()=>{
    const isOverflowing = votingCategories.length > categoryGridSize;
    if(isOverflowing){
      handleOverflow();
    }else{
      // fill empty indexs with "undefined"
      setVotingCategories([
        ...votingCategories, 
        ...new Array(categoryGridSize - votingCategories.length).map(()=>undefined)
      ]);
    }
  }, [categoryGridSize])

  useEffect(()=>{
    tmiSetIsVoting(isVoting);
  }, [isVoting])

  useEffect(()=>{
    tmiSetPrefix(prefix);
  }, [prefix])

  useEffect(()=>{
    handleWindowSizeUpdate();
    window.addEventListener('resize', handleWindowSizeUpdate);
    return () => window.removeEventListener('resize', handleWindowSizeUpdate);
  }, [])

  const handleWindowSizeUpdate = () =>{
    const isClient = typeof window === 'object';
    setWindowSize(isClient ? window.innerWidth : undefined);
  }

  const handleOverflow = () =>{
    // create an array of categories then slice to fit within size params
    const definedCategories = votingCategories.filter((value: any)=>value!=undefined);
    setVotingCategories(
      definedCategories.slice(0, categoryGridSize)
    );
  }

  const addVotingCategoryAtIndex = (category: { name: string, color: string, votes: [], regexListener: string }, slotIndex: number) =>{
    const isFull = votingCategories.indexOf(undefined) == -1;
    if(!isFull){
      // place/replace category at index
      setVotingCategories([
        ...votingCategories.slice(0, slotIndex), 
        category, 
        ...votingCategories.slice(slotIndex+1)
      ]);
      tmiAddCategoryAtIndex(category, slotIndex);
    }else{
      throw('max categories reached');
    }
  }

  const pushVotingCategory = (category: { name: string, color: string, votes: [], regexListener: string }) =>{
    const isFull = votingCategories.indexOf(undefined) == -1;
    const emptyIndex = votingCategories.indexOf(undefined);
    if(isFull && categoryOptions.length != categoryOptions.indexOf(categoryGridSize)){
      // if category grid is full & grid size is not equal to max grid size, create two new category slots & populate the first with the new category
      setVotingCategories([
        ...votingCategories,
        category,
        undefined
      ]);
      setCategoryGridSize(categoryOptions[categoryOptions.indexOf(categoryGridSize)+1])
    }else if(categoryOptions.length != categoryOptions.indexOf(categoryGridSize)){
      // otherwise if current grid is not full, place new category at the first "undefined" slot found
      setVotingCategories([
        ...votingCategories.slice(0, emptyIndex),
        category,
        ...votingCategories.slice(emptyIndex+1)
      ]);
    }else{
      throw('max categories reached');
    }
    tmiAddCategory(category);
  }

  const updateVotingCategory = (category: any, index: number) =>{
    setVotingCategories([
      ...votingCategories.slice(0, index),
      category,
      ...votingCategories.slice(index+1)
    ]);
  }

  const removeCategory = (index: number) =>{
    // "remove" by replacing category at index with "undefined"
    setVotingCategories([
      ...votingCategories.slice(0, index),
      undefined,
      ...votingCategories.slice(index+1)
    ]);
    tmiRemoveCategory(index);
  }

  const openPopup = (slotIndex: number) =>{
    setSlotIndex(slotIndex);
    setIsCreatingNew(true);
  }

  const resetVoteCount = (index: number) =>{
    setVotingCategories([
      ...votingCategories.slice(0, index),
      {
        ...votingCategories[index],
        votes: []
      },
      ...votingCategories.slice(index+1)
    ]); 
  }

  const createRegexListener = (category: { name: string }) =>{
    // input: "*"
    // SyntaxError: Invalid regular expression: /*/: Nothing to repeat
    const re = new RegExp(`${prefix}${category.name}`, 'gi');
    return re;
  }

  return (
    <div className='main-wrapper'>
      <Head>
        <title>{props.channel} | Stream Vote</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, maximum-scale=1, maximum-scale=1.0, user-scalable=0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainMenu 
        isOpen={isMenuOpen}
        setIsOpen={setIsMenuOpen}
        prefix={prefix}
        setPrefix={setPrefix}
        addVotingCategory={addVotingCategoryAtIndex}
        setIsCreatingNew={setIsCreatingNew}
        isCreatingNew={isCreatingNew}
        categoryCount={categoryGridSize}
        setCategoryCount={setCategoryGridSize}
        categoryOptions={categoryOptions}
        handleFilter={handleFilter}
      />
      <NewCategoryPopup 
        isCreatingNew={isCreatingNew}
        setIsCreatingNew={setIsCreatingNew}
        votingCategories={votingCategories}
        addVotingCategoryAtIndex={addVotingCategoryAtIndex}
        updateVotingCategory={updateVotingCategory}
        pushVotingCategory={pushVotingCategory}
        createRegexListener={createRegexListener}
        slotIndex={slotIndex}
        setSlotIndex={setSlotIndex}
      />
      <NewChannelPopup 
        setCurrentChannel={setCurrentChannel}
        isSettingNewChannel={isSettingNewChannel}
        setIsSettingNewChannel={setIsSettingNewChannel}
      />
      <div className="main">
        <div className='main__header'>
          <div className='main__header-left'>
              <FiSettings 
                className='main__settings-icon' 
                onClick={(e: any)=>setIsMenuOpen(true)}
              />
              {windowSize! > 700 &&
                <VoteControls 
                  addVotingCategory={addVotingCategoryAtIndex}
                  setIsCreatingNew={setIsCreatingNew}
                  isCreatingNew={isCreatingNew}
                  categoryCount={categoryGridSize}
                  setCategoryCount={setCategoryGridSize}
                  categoryOptions={categoryOptions}
                  handleFilter={handleFilter}
                />
              }
          </div>
          <Timer
            isTimerRunning={isTimerRunning}
            setIsTimerRunning={setIsTimerRunning}
            isVoting={isVoting}
            setIsVoting={setIsVoting}
          />
          <span className='main__channel-name'>
            {windowSize! > 700&&
              <span
                className='channel-name__prefix'
              >
                  Current Channel:
              </span>
            }
            <span 
              className='channel-name__name'
              onClick={(e: any)=>{setIsSettingNewChannel(true)}}
            >
              {currentChannel}
              <FiEdit className='name__edit-icon'/>
            </span>
          </span>
        </div>
        <Leaderboard 
          leaderboard={leaderboard.slice(0, 3)}
        />
        <div className='main__left main__vote-container'>
          {
            Array.from(Array(Math.ceil(categoryGridSize/2))).map((value: any, index: number)=>{
              const location = index+index+1;
              const category = votingCategories[location];
              return (
                <VoteItem 
                  key={index}
                  openPopup={openPopup}
                  categoryData={category}
                  index={location}
                  categoryCount={categoryGridSize}
                  resetVoteCount={resetVoteCount}
                  removeCategory={removeCategory}
                  prefix={prefix}
                />
              );
            })
          }
        </div>
        <div className="main__center">
          <ChatBox 
            chatData={chatData}
          /> 
        </div>
        <div className='main__right main__vote-container'>
          {
            Array.from(Array(Math.floor(categoryGridSize/2))).map((value: any, index: number)=>{
              const location = index*2;
              const category = votingCategories[location];
              return(
                <VoteItem 
                  key={index}
                  openPopup={openPopup}
                  categoryData={category}
                  index={location}
                  categoryCount={categoryGridSize}
                  resetVoteCount={resetVoteCount}
                  removeCategory={removeCategory}
                  prefix={prefix}
                />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Home;
