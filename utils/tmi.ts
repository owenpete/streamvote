import tmi from 'tmi.js';

const prefix: string = '';
const maxChatSize: number = 50;
let isVoting: boolean = false;
let votingCategories: any[] = [];

let messages: any[] = [];

const client = new tmi.Client({
  channels: ['summit1g']
});

export const addCategory = (name: string, color: string) =>{
  votingCategories.push({name: name, color: color});
  return votingCategories;
}

export const removeCategory = (name: string) => {
}

export const getCategories = ()=>{
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