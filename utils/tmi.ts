import { read, readSync } from 'fs';
import { connected } from 'process';
import { GiConsoleController } from 'react-icons/gi';
import tmi from 'tmi.js';

let prefix: string = '';
const maxChatSize: number = 50;
let isVoting: boolean = false;
let votingCategories: any[] = [];
let currentChannel: string[] = [];

let messages: any[] = [];

const client = new tmi.Client({
  channels: currentChannel 
});

export const tmiAddCategory = (category: { name: string, color: string}) =>{
  votingCategories[votingCategories.indexOf(undefined)] = category;
}

export const tmiAddCategoryAtIndex = (category: { name: string, color: string, votes: [] }, index: number) =>{
  const currentMaxIndex: number = votingCategories.length-1;
  if(currentMaxIndex < index){
    for(let i = votingCategories.length; i <= index; i++){
      if(i == index){
        votingCategories.push(category);
      }else{
        votingCategories.push(undefined);
      }
    }
  }else{
    votingCategories[index] = category;
  }
}

export const tmiSetCategory = (arr: any[]) =>{
  votingCategories = arr;
}

export const tmiRemoveCategory = (index: number) => {
  votingCategories[index] = undefined;
}

export const tmiGetCategories = ()=>{
  return (votingCategories);
}

export const tmiGetMessages = () =>{
  return messages;
}

export const tmiSetIsVoting = (isVoteRunning: boolean) =>{
  isVoting = isVoteRunning;
}

export const tmiGetIsVoting = () =>{
  return isVoting;
}

export const tmiSetPrefix = (pfx: string) =>{
  prefix = pfx;
}

export const tmiGetPrefix = () =>{
  return prefix; 
}

export const tmiSetCurrentChannel = (channel: string) =>{
  currentChannel[0] = channel;
}

export const tmiGetCurrentChannel = () =>{
  return currentChannel[0];
}

export const tmiConnect = async() =>{
  const readyState = client.readyState();
  if(readyState == 'OPEN'){
    await client.disconnect();
    await client.connect();
  }
  if(readyState == 'CLOSED'){
    await client.connect();
  }
}

const listenForVotes = (message: string, user: string) =>{
  const firstWord = message.split(' ')[0];
  if(firstWord.slice(0, prefix.length).toLowerCase() == prefix){
    for(let i = 0; i < votingCategories.length; i++){
      if(votingCategories[i] == undefined){
        continue;
      }
      if(firstWord.search(votingCategories[i].regexListener) != -1){
        if(!votingCategories[i].votes.includes(user)){
          votingCategories[i].votes.push(user);
        }
      }
    }
  }else{
  }
}

const onMessageHandler = (target: any, tags: any, msg: string, self: any)=>{
  if(messages.length >= maxChatSize){
    messages.pop();
  }
  messages.unshift({
    displayName: tags.diaplayName,
    username: tags.username, 
    userColor: tags.color,
    message: msg
  });
  
  if(isVoting){
    listenForVotes(msg, tags.username)
  }
}

client.on('message', onMessageHandler)

tmiConnect();

export { 
  messages,
};