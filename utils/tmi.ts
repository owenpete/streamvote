import tmi from 'tmi.js';

const prefix: string = '';
const maxChatSize: number = 50;

let messages: any[] = [];

const client = new tmi.Client({
  channels: ['stringplayergamer']
});

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