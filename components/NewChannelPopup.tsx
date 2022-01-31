import { useEffect, useState } from 'react';

interface Props{
  setCurrentChannel: any;
}

const NewChannelPopup = (props: Props) =>{
  const [channelName, setChannelName] = useState<string>('');
  return (
    <div className='new-channel-popup'>
      <input 
        className='new-channel-popup__text-input'
        type="text" 
        placeholder='Channel Name'
        value={channelName}
        onChange={(e: any)=>setChannelName(e.target.value)}
      />
    </div>
  );
}

export default NewChannelPopup;