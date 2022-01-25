import { useEffect, useState } from 'react';
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

import { tmiGetCategories, tmiAddCategory, tmiAddCategoryAtIndex, tmiRemoveCategory, tmiGetMessages, tmiSetIsVoting, tmiGetIsVoting, tmiSetPrefix, tmiSetCategory } from '../utils/tmi'; 
import toggleDimmer from '../utils/toggleDimmer';

interface ChatData{
  messages: any[];
}

const Home: NextPage = () => {
  const [chatData, setChatData] = useState<ChatData | undefined>(undefined);
  const [votingCategories, setVotingCategories] = useState<any>([]);
  const [leaderboard, setLeaderboard] = useState<any>([]);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [slotIndex, setSlotIndex] = useState<number | undefined>(undefined);
  const [isVoting, setIsVoting] = useState<boolean>(false);
  const [prefix, setPrefix] = useState<string>('');
  const categoryOptions = [2, 4, 6, 8];

  const [categoryGridSize, setCategoryGridSize] = useState<any>(categoryOptions[0]);

  const handleFilter = (categoryCount: string) =>{
    setCategoryGridSize(+categoryCount);
  }

  useEffect(()=>{
    let timerFunc = setInterval(() => {
      setChatData({
        messages: tmiGetMessages()
      });
      setVotingCategories(tmiGetCategories());
    }, 1000);
    return () => clearInterval(timerFunc)
  });

  useEffect(()=>{
    // updates backend data when fontend category is added
    tmiSetCategory(votingCategories);
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

  const createRegexListener = (category: { name: string }) =>{
    const re = new RegExp(`${prefix}${category.name}`, 'gi');
    return re;
  }

  return (
    <div className='index'>
      <Head>
        <title>Stream Vote</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, maximum-scale=1, maximum-scale=1.0, user-scalable=0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
      <div className="main">
        <VoteControls 
          addVotingCategory={addVotingCategoryAtIndex}
          setIsCreatingNew={setIsCreatingNew}
          isCreatingNew={isCreatingNew}
          categoryCount={categoryGridSize}
          setCategoryCount={setCategoryGridSize}
          categoryOptions={categoryOptions}
          handleFilter={handleFilter}
        />
        <Timer
          isTimerRunning={isTimerRunning}
          setIsTimerRunning={setIsTimerRunning}
          isVoting={isVoting}
          setIsVoting={setIsVoting}
        />
        <Leaderboard 
          leaderboard={votingCategories.slice(0, 3)}
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
                  removeCategory={removeCategory}
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
                  removeCategory={removeCategory}
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
