import tmi from 'tmi.js';

let msgs: any = [];

const client = new tmi.Client({
  channels: ['lcs']
});

const onMessageHandler = (target: any, context: any, msg: string, self: any)=>{
  msgs.push(msg);
}

client.on('message', onMessageHandler)

client.connect();

export default msgs;