import { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';

interface Props{
  name: string;
  color: string;
  setIsCreatingNew: any;
}

const VoteItem = (props: Props) =>{
  return (
    <div 
      className='vote-item' 
      style={{backgroundColor: `${props.color}`}}
      onClick={()=>props.setIsCreatingNew(true)}
      >
        <FiPlus />
    </div>
  );
}

export default VoteItem;