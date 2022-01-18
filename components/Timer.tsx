import { useState } from "react";

interface Props{
  isEnabled: boolean;
  isRunning: boolean;
}

const Timer = (props: Props) =>{
  return (
    <div className="timer">
      5:00
      {
        props.isRunning?
        <input 
          type='button'
          value='Stop'
          className='timer__stop timer__button'
        />
        :
        <input 
          type='button'
          value='Start'
          className='timer__start timer__button'
        />
      }
    </div>
  );
}

export default Timer;