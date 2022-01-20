import { useEffect, useState } from "react";

interface Props{
  isTimerRunning: boolean;
  isVoting: boolean;
  setIsVoting: any;
  setIsTimerRunning: any;
}

const Timer = (props: Props) =>{

  const handleTimerButtonClick = (button: 'stop' | 'start') =>{
    switch(button){
      case 'stop':
        props.setIsTimerRunning(false);
        props.setIsVoting(false);
        break;
      case 'start':
        props.setIsTimerRunning(true);
        props.setIsVoting(true);
        break;
    }
  }

  return (
    <div className="timer">
      5:00
      {
        props.isTimerRunning?
        <input 
          type='button'
          value='Stop'
          className='timer__stop timer__button'
          onClick={()=>handleTimerButtonClick('stop')}
        />
        :
        <input 
          type='button'
          value='Start'
          className='timer__start timer__button'
          onClick={()=>handleTimerButtonClick('start')}
        />
      }
    </div>
  );
}

export default Timer;