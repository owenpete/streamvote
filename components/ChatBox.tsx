import { useEffect, useRef } from "react";

interface Props{
  chatData: any;
}

const ChatBox = (props: Props) =>{
  return (
    <div className='chat-box'>
      <div className='chat-box__chat'>
        {props.chatData != undefined &&
          props.chatData.messages.map((value: any)=>{
            return (
              <span className='chat-box__message'>
                <span className='message__username' style={{color: `${value.userColor}`}}>
                  {value.username}<span style={{color: 'white'}}>:</span>
                  </span>
                  <span className='message__text'>
                    {value.message}
                  </span>
              </span>
            )
          })
        }
      </div>
    </div>
  );
}

export default ChatBox;