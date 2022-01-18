import { useState } from "react";

interface Props{
  isRunning: boolean;
  setTimer: any;
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
          onClick={()=>props.setTimer(false)}
        />
        :
        <input 
          type='button'
          value='Start'
          className='timer__start timer__button'
          onClick={()=>props.setTimer(true)}
        />
      }
    </div>
  );
}

export default Timer;