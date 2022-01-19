import { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';

interface Props{
  name: string;
  color: string;
}

const VoteItem = (props: Props) =>{
  return (
    <div 
      className='vote-item' 
      style={{backgroundColor: `${props.color}`}}
      >
        <FiPlus />
    </div>
  );
}

export default VoteItem;