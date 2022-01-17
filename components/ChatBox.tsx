import { useEffect, useRef } from "react";

interface Props{
  chatData: any;
}

const ChatBox = (props: Props) =>{
  return (
    <div className='chat-box'>
      {props.chatData != undefined &&
        props.chatData.messages.map((value: any)=>{
          return (
            <span className='chat-box__message'>
              {value.user}: {value.message}
            </span>
          )
        })
      }
    </div>
  );
}

export default ChatBox;