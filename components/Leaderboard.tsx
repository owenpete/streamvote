import { useEffect, useState } from "react";
import { FaCrown } from 'react-icons/fa';

interface Props{
  leaderboard: any | undefined; 
  isVoting: boolean;
}

const Leaderboard = (props: Props) =>{
  const [isShowingVotes, setIsShowingVotes] = useState<boolean>(true);
  const [totalVotes, setTotalVotes] = useState<number>(0);

  useEffect(()=>{
    let total = 0;
    if(props.leaderboard != undefined){
      props.leaderboard.map((value: any)=>{
        if(value != undefined){
          total += value.votes.length;
        }
      });
    }
    setTotalVotes(total);
  });

  const handleItemClick = () =>{
    setIsShowingVotes(!isShowingVotes);
  }

  const getPrecentage = (votes: any, totalVotes: number): number =>{
    const precentage = Math.round((votes/totalVotes) * 1000)/10;
    return isNaN(precentage) ? 0 : precentage;
  }

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
                onClick={(e: any)=>handleItemClick()}
              >
                <span className='item__number'>{index+1}.</span>{value.name}
                {index == 0 && !props.isVoting &&
                  <FaCrown className='item__crown' />
                }
                <span className='item__votes'>
                  {isShowingVotes?
                      value.votes.length
                    :
                      getPrecentage(value.votes.length, totalVotes) + '%'
                  }
                </span>
              </li>
          )
        })
        }
    </div>
  );
}

export default Leaderboard;