import { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';

interface Props{
  categoryData: any;
  openPopup: any;
  index: number;
  categoryCount: number;
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
          <span 
            className='vote-item__name'
            style={{
              color: `${props.categoryData.color.name == 'black'? 'white' : 'black'}`,
              }}
          >
            {props.categoryData.name}
          </span>
          <span 
            className='vote-item__votes'
            style={{
              color: `${props.categoryData.color.name == 'black'? 'white' : 'black'}`
            }}
            >
              0
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