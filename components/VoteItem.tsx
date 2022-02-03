import { useEffect, useState } from 'react';
import { FiPlus, FiRotateCw, FiSettings, FiTrash } from 'react-icons/fi';

interface Props{
  categoryData: any;
  openPopup: any;
  index: number;
  categoryCount: number;
  resetVoteCount: any;
  removeCategory: any;
  prefix: string;
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