import { useEffect, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import toggleDimmer from '../utils/toggleDimmer';

interface Props{
  addVotingCategory: any;
  setIsCreatingNew: any;
  isCreatingNew: boolean;
  categoryCount: number;
  setCategoryCount: any;
  filterCategories: any;
  handleFilter: any;
}

const VoteControls = (props: Props) =>{
  useEffect(()=>{
    toggleDimmer(props.isCreatingNew);
  }, [props.isCreatingNew])
  
  return (
    <div className='vote-controls'>
      <div className='resbar__filter'>
        <input className='resbar__dropdown-button' value={`# of categories: ${props.categoryCount}`} type='button' />
        <FiChevronDown className='resbar__dropdown-arrow' />
        <select
          name='catagories'
          className='resbar__dropdown'
          onChange={(e)=>{props.handleFilter(e.target.value)}}
          value={props.categoryCount}
        >
          {
            //populating filters
            props.filterCategories.map((value: any)=>{
              return (
                <option value={value.name} key={Math.random()}>{value.name}</option>
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