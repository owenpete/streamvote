import { useEffect, useState } from "react";

interface Props{
  leaderboard: any; 
}

const Leaderboard = (props: Props) =>{
  return (
    <div className="leaderboard">
      {
        props.leaderboard.map((value: any)=>{
          return (
            <li className='leaderboard__item'>
              {value}
            </li>
          )
        })
      }
    </div>
  );
}

export default Leaderboard;