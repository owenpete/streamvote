import tmi from 'tmi.js';

const prefix: string = '';
const maxChatSize: number = 50;

let messages: any[] = [];

const client = new tmi.Client({
  channels: ['nickmercs']
});

const onMessageHandler = (target: any, tags: any, msg: string, self: any)=>{
  if(messages.length >= maxChatSize){
    messages.pop();
  }
  messages.unshift({user: tags.username, message: msg})
}

client.on('message', onMessageHandler)

client.connect();

export { 
  messages,
};