import { useEffect, useState } from "react";
import { FaCrown } from 'react-icons/fa';

interface Props{
  leaderboard: any | undefined; 
  isVoting: boolean;
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
                {index == 0 && !props.isVoting &&
                  <FaCrown className='item__crown' />
                }
                <span className='item__votes'>{value.votes.length}</span>
              </li>
          )
        })
        }
    </div>
  );
}

export default Leaderboard;