import tmi from 'tmi.js';

const prefix: string = '';
const messageLimit: number = 50;

let messages: any[] = [{}];

const client = new tmi.Client({
  channels: ['lcs']
});

const onMessageHandler = (target: any, tags: any, msg: string, self: any)=>{

  if(messages.length >= messageLimit){
    messages.shift();
  }
  messages.push({user: tags.username, message: msg})
}

client.on('message', onMessageHandler)

client.connect();

export { 
  messages,
};