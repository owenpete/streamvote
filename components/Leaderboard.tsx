import { useEffect, useState } from "react";

interface Props{
  leaderboard: any | undefined; 
}

const Leaderboard = (props: Props) =>{
  return (
    <div 
      className="leaderboard"
    >
      {
        props.leaderboard.map((value: any, index: number)=>{
          return (
            value&&
              <li 
                className='leaderboard__item'
                key={index}
              >
                <span className='item__number'>{index+1}.</span>{value.name}
                <span className='item__votes'>{value.votes.length}</span>
              </li>
          )
        })
        }
    </div>
  );
}

export default Leaderboard;