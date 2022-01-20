import { connected } from 'process';
import tmi from 'tmi.js';

let prefix: string = '';
const maxChatSize: number = 50;
let isVoting: boolean = false;
let votingCategories: any[] = [];

let messages: any[] = [];

const client = new tmi.Client({
  channels: ['sodapoppin']
});

export const tmiAddCategory = (category: { name: string, color: string}) =>{
  votingCategories[votingCategories.indexOf(undefined)] = category;
  return votingCategories;
}

export const tmiAddCategoryAtIndex = (category: { name: string, color: string}, index: number) =>{
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
  return votingCategories;
}

export const tmiRemoveCategory = (index: number) => {
  votingCategories[index] = undefined;
}

export const tmiGetCategories = ()=>{
  return (votingCategories);
}

export const getMessages = () =>{
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

const onMessageHandler = (target: any, tags: any, msg: string, self: any)=>{
  if(messages.length >= maxChatSize){
    messages.pop();
  }
  messages.unshift({
    displayName: tags.diaplayName,
    username: tags.username, 
    userColor: tags.color,
    message: msg
  })
}

client.on('message', onMessageHandler)

client.connect();

export { 
  messages,
};