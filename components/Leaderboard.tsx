import { useEffect, useState } from "react";

interface Props{
  leaderboard: any; 
}

const Leaderboard = (props: Props) =>{
  return (
    <div className="leaderboard">
      {
        props.leaderboard.map((value: any, index: number)=>{
          return (
            <li 
              className='leaderboard__item'
              key={index}
            >
              {value}
            </li>
          )
        })
      }
    </div>
  );
}

export default Leaderboard;