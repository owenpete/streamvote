import { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';

interface Props{
  categoryData: any;
  openPopup: any;
  index: number;
}

const VoteItem = (props: Props) =>{
  return (
    <>
    {
      props.categoryData?
        <div
          className='vote-item'
          style={{backgroundColor: `${props.categoryData.color.hex}`}}
        >
          <span 
            className='vote-item__name'
            style={{
              color: `${props.categoryData.color.name == 'black'? 'white' : 'black'}`
              }
            }
          >
            {props.categoryData.name}
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