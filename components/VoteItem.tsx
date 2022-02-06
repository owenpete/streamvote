import { useEffect, useState } from 'react';
import { FiPlus, FiRotateCw, FiSettings, FiTrash } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';

interface Props{
  categoryData: any;
  openPopup: any;
  index: number;
  categoryCount: number;
  resetVoteCount: any;
  removeCategory: any;
  prefix: string;
  isWinning: boolean;
  isVoting: boolean;
}

const VoteItem = (props: Props) =>{
  return (
    <>
    {
      props.categoryData?
        <div
          className='vote-item'
          style={{
            backgroundColor: `${props.categoryData.color.hex}`,
            flexDirection: `${props.categoryCount > 6? 'row' : 'column'}`,
            justifyContent: `${props.categoryCount > 6? 'space-between' : 'space-evenly'}`,
            fontSize: `${props.categoryCount > 6? '46px' : '54px'}`
         }}
        >
          {props.isWinning && !props.isVoting &&
            <div className='vote-item__crown-container'>
              <FaCrown 
                className='vote-item__crown' 
                style={{color: `${props.categoryData.color.name == 'yellow' ? 'black' : 'gold'}`}}
              />
            </div>
          }
          <div className={`vote-item__hover`}>
            <FiSettings 
              className='hover__icon'
              onClick={()=>props.openPopup(props.index)}
            />
            <FiRotateCw 
              className='hover__icon icon__reset'
              onClick={()=>props.resetVoteCount(props.index)}
            />
            <FiTrash 
              className='hover__icon'
              onClick={()=>props.removeCategory(props.index)}
            />
          </div>
          <span 
            className='vote-item__name'
            style={{
              color: `${props.categoryData.color.name == 'black'? 'white' : 'black'}`,
              }}
          >
            {props.prefix}{props.categoryData.name}
          </span>
          <span 
            className='vote-item__votes'
            style={{
              color: `${props.categoryData.color.name == 'black'? 'white' : 'black'}`
            }}
            >
              {props.categoryData.votes.length}
          </span>
        </div>
      :
        <div 
          className='vote-item vote-item--placeholder' 
          onClick={()=>{props.openPopup(props.index)}}
        >
            <FiPlus />
        </div>
    }
    </>
  );
}

export default VoteItem;