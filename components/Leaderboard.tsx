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
              <span className='item__number'>{index+1}.</span>{value.name}
            </li>
          )
        })
      }
    </div>
  );
}

export default Leaderboard;