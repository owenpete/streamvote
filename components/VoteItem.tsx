import { useEffect, useState } from 'react';
import { FiPlus, FiSettings, FiTrash } from 'react-icons/fi';

interface Props{
  categoryData: any;
  openPopup: any;
  index: number;
  categoryCount: number;
  removeCategory: any;
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