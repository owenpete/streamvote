import { useEffect, useState } from 'react';

interface Props{
  name: string;
  command: string;
  color: string;
}

const VoteItem = (props: Props) =>{
  return (
    <div 
      className='vote-item' 
      style={{backgroundColor: `${props.color}`}}
      >

    </div>
  );
}

export default VoteItem;