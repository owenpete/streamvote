import { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';

interface Props{
  categoryData: any;
  setIsCreatingNew: any;
}

const VoteItem = (props: Props) =>{
  return (
    <>
    {
      props.categoryData?
        <div
          className='vote-item'
          style={{backgroundColor: `${props.categoryData.color}`}}
        >

        </div>
      :
        <div 
          className='vote-item vote-item--placeholder' 
          onClick={()=>props.setIsCreatingNew(true)}
        >
            <FiPlus />
        </div>
    }
    </>
  );
}

export default VoteItem;