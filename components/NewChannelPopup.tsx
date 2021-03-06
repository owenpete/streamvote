import { useEffect, useState } from 'react';
import toggleDimmer from '../utils/toggleDimmer';
import { FiArrowRightCircle, FiX } from 'react-icons/fi';
import { useRouter } from 'next/router';

interface Props{
  setCurrentChannel: any;
  isSettingNewChannel: boolean;
  setIsSettingNewChannel: any;
}

const NewChannelPopup = (props: Props) =>{
  const [channelName, setChannelName] = useState<string>('');
  const router = useRouter();

  useEffect(()=>{
    toggleDimmer(props.isSettingNewChannel);
  }, [props.isSettingNewChannel]);

  const handleChannelNameConfirm = async(channelName: string) =>{
    const hasChannelName: boolean = channelName.replaceAll(' ', '').length != 0; 
    if(hasChannelName){
      await router.push(`/${channelName}`, undefined, { shallow: false });
      router.reload();
      props.setIsSettingNewChannel(false);
    }else{
      console.error('no channel name')
    }
  }

  return (
    <>
      {props.isSettingNewChannel && 
        <div className='new-channel-popup'>
          <div className='new-channel-popup__container'>
            <FiX 
              className='new-channel-popup__exit' 
              onClick={()=>props.setIsSettingNewChannel(false)}
            />
            <div className="new-channel-popup__input">
              <input 
                className='new-channel-popup__text-input'
                type="text" 
                placeholder='Channel Name'
                value={channelName}
                onChange={(e: any)=>setChannelName(e.target.value)}
                onKeyDown={(e: any)=>e.key == 'Enter' ? handleChannelNameConfirm(channelName) : null}
                autoFocus={true}
            />
            <FiArrowRightCircle 
              className='new-channel-popup__confirm-icon'
              onClick={(e: any)=>handleChannelNameConfirm(channelName)}
            />
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default NewChannelPopup;