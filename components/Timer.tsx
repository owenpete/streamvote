import { useEffect, useRef, useState } from "react";
import { GiConsoleController } from "react-icons/gi";

interface TimerProps{
  isTimerRunning: boolean;
  isVoting: boolean;
  setIsVoting: any;
  setIsTimerRunning: any;
}

interface TimerDisplayProps{
  timer: number;
  setTimer: any;
  isTimerRunning: boolean;
  initTime: any;
}

const TimerDisplay = (props: TimerDisplayProps) =>{
  const [finalTime, setFinalTime] = useState<string>('');
  const [editingDisplay, setEditingDisplay] = useState<string[]>(['0', '0', 'h', '0', '0', 'm', '0', '0', 's'])
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isEditingFocus, setIsEditingFocus] = useState<boolean>(false);
  const timeInputRef = useRef<any>();
  const hours = Math.floor(props.timer/3600);
  const mins = Math.floor((props.timer-hours*3600)/60);
  const secs = props.timer - mins * 60;

  useEffect(()=>{
    setFinalTime(createTimeString(hours, mins, secs));
  }, [props.timer]);

  useEffect(()=>{
    if(isEditing && props.isTimerRunning){
      updateTimer(editingDisplay);
      setIsEditing(false);
    }
  }, [props.isTimerRunning])

  useEffect(()=>{
    if(!isEditing){
      timeInputRef.current.blur();
    }
  }, [isEditing])

  const editDisplay = () =>{
    setIsEditing(true);
  }

  const createTimeString = (hours: number, mins: number, secs: number) =>{
    const str_pad_left = (string: any, pad: string, length: number) =>{
      return (new Array(length+1).join(pad)+string).slice(-length);
    }
    let timeString = hours+':'+str_pad_left(mins, '0', 2)+':'+str_pad_left(secs,'0',2);
    return timeString;
  }

  const handleTimeChange = (input: string) =>{
    const isNumber = !isNaN(+input); 
    if(isNumber && input != ' '){
      const digits: string[] = editingDisplay.filter((value: any)=>!isNaN(value));
      const timeSymbols: string[] = editingDisplay.filter((value: any)=>isNaN(value));
      digits.shift();
      digits.push(input);
  
      let finalArr: string[] = [];
      for(let i = 0; i < digits.length; i++){
        if(i%2!=0){
          finalArr.push(digits[i]);
          finalArr.push(timeSymbols[Math.floor(i/2)])
        }else{
          finalArr.push(digits[i]);
        }
      }
      setEditingDisplay(finalArr);
    }else if(input == 'Backspace'){
      const digits: string[] = editingDisplay.filter((value: any)=>!isNaN(value));
      const timeSymbols: string[] = editingDisplay.filter((value: any)=>isNaN(value));
      digits.pop();
      digits.unshift('0');
  
      let finalArr: string[] = [];
      for(let i = 0; i < digits.length; i++){
        if(i%2!=0){
          finalArr.push(digits[i]);
          finalArr.push(timeSymbols[Math.floor(i/2)])
        }else{
          finalArr.push(digits[i]);
        }
      }
      setEditingDisplay(finalArr);
    }else if(input == 'Enter'){
      updateTimer(editingDisplay);
      setIsEditing(false);
    }else if(input == 'Escape'){
      setIsEditing(false);
    }
  }

  const updateTimer = (timeArr: string[]) =>{
      const digits = timeArr.filter((value: any)=>!isNaN(value));
      let hmsArray = [];
      for(let i = 0; i < digits.length; i+=2){
        hmsArray.push(`${digits[i]}${digits[i+1]}`)
      }
      const total = convertStringToSeconds(hmsArray);
      props.setTimer(total);
      props.initTime.current = total;
  }

  const convertStringToSeconds = (hms: string[]) =>{
    const hours = +hms[0]; 
    const mins = +hms[1]; 
    const secs = +hms[2]; 
    const total = (hours*3600) + (mins*60) + secs;
    return total;
  }

  const handleTimerFocus = () =>{
    setIsEditingFocus(true);
    setIsEditing(true);
  }

  const handleTimerBlur = () =>{
    setIsEditingFocus(false);
    setIsEditing(false);
  }

  return (
    <span 
      className='timer__display'
      onClick={()=>editDisplay()}
    >
      <span
        className={`display__time ${isEditing? 'display__time--editing' : ''} ${isEditingFocus? 'display__time--focus' : ''}`}
        onClick={()=>timeInputRef.current.focus()}
      >
        {
          isEditing?
            editingDisplay.map((value: any, index: number)=>{
              const firstOccupiedIndex = editingDisplay.join('').search(/[^0a-zA-Z]/g);
              return (
                <span 
                  className={`time__element ${isNaN(value) ? 'time__step' : 'time__number'}`} 
                  style={{color: `${firstOccupiedIndex < index+1 && firstOccupiedIndex != -1 ? 'rgb(255, 255, 255)' : ''}`}}
                  key={index}
                >
                  {value}
                </span>
              )
            })
            :
            finalTime
        }
      </span>
      <input
        className='time__input'
        type='text'
        ref={timeInputRef}
        onKeyDownCapture={(e: any)=>handleTimeChange(e.nativeEvent.key)}
        onFocus={(e: any)=>handleTimerFocus()}
        onBlur={(e: any)=>handleTimerBlur()}
      />
    </span>
  )
}

const Timer = (props: TimerProps) =>{
  const [timer, setTimer] = useState<number>(300);
  const initTime = useRef(timer);

  useEffect(()=>{
    let timerInterval: any;
    if(props.isTimerRunning){
      timerInterval = setInterval(()=>{
        if(timer != 0){
          setTimer(timer => timer - 1);
        }else{
          props.setIsTimerRunning(false);
          props.setIsVoting(false);
        }
      }, 1000);
    }else{
      clearInterval(timerInterval);
    }
    return () => clearInterval(timerInterval);
  });

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

  const handleReset = () =>{
    setTimer(initTime.current);
    props.setIsTimerRunning(false);
    props.setIsVoting(false)
  }

  return (
    <div className="timer">
      <TimerDisplay
        timer={timer}
        setTimer={setTimer}
        isTimerRunning={props.isTimerRunning}
        initTime={initTime}
      />
      <div className='timer__actions'>
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
        <input 
          type='button'
          value='Reset'
          className='timer__reset timer__button'
          onClick={()=>handleReset()}
        />
      </div>
    </div>
  );
}

export default Timer;