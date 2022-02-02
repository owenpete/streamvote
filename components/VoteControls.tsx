import { useEffect, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

interface Props{
  addVotingCategory: any;
  setIsCreatingNew: any;
  isCreatingNew: boolean;
  categoryCount: number;
  setCategoryCount: any;
  categoryOptions: any;
  handleFilter: any;
}

const VoteControls = (props: Props) =>{
  return (
    <div className='vote-controls'>
      <div className='vote-controls__dropdown-container'>
        <input className='vote-controls__dropdown-button' value={`# of categories: ${props.categoryCount}`} type='button' />
        <FiChevronDown className='vote-controls__dropdown-arrow' />
        <select
          name='catagories'
          className='vote-controls__dropdown'
          onChange={(e)=>{props.handleFilter(e.target.value)}}
          value={props.categoryCount}
        >
          {
            //populating filters
            props.categoryOptions.map((value: any)=>{
              return (
                <option value={value} key={Math.random()}>{value}</option>
              );
            })
          }
        </select>
      </div>
      <input 
        className='vote-controls__add-new-button'
        type="button"
        value="Add New"
        onClick={()=>props.setIsCreatingNew(true)}
      />
    </div>
  );
}

export default VoteControls;