import { useEffect, useRef } from "react";

interface Props{
  chatData: any;
}

const ChatBox = (props: Props) =>{
  return (
    <div className='chat-box'>
      <div className='chat-box__chat'>
        {props.chatData != undefined &&
          props.chatData.messages.map((value: any, index: number)=>{
            return (
              <span 
                className='chat-box__message' 
                key={index}
              >
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