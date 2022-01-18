import { useState } from "react";

interface Props{
  isEnabled: boolean;
  isRunning: boolean;
}

const Timer = (props: Props) =>{
  return (
    <div className="timer">
      5:00
    </div>
  );
}

export default Timer;