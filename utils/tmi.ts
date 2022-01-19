import tmi from 'tmi.js';

const prefix: string = '';
const maxChatSize: number = 50;
let isVoting: boolean = false;
let votingCategories: any[] = [];

let messages: any[] = [];

const client = new tmi.Client({
  channels: ['summit1g']
});

export const tmiAddCategory = (category: { name: string, color: string}) =>{
  votingCategories.push(category);
  return votingCategories;
}

export const tmiRemoveCategory = (name: string) => {
}

export const tmiGetCategories = ()=>{
  return (votingCategories);
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