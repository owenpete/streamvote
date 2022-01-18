import { useEffect, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import toggleDimmer from '../utils/toggleDimmer';

interface Props{
  addVotingCategory: any;
  setIsCreatingNew: any;
  isCreatingNew: boolean;
}

const VoteControls = (props: Props) =>{
    const filterCategories = [
    {
      name:'2',
      filter: ''
    },
    {
      name:'4',
      filter: 'price-asc'
    },
    {
      name:'6',
      filter: 'price-desc'
    },
    {
      name:'8',
      filter: 'a-z'
    }
  ];

  const [categoryCount, setCategoryCount] = useState<any>(2);

  const handleFilter = (categoryCount: string) =>{
    setCategoryCount(+categoryCount);
  }

  useEffect(()=>{
    toggleDimmer(props.isCreatingNew);
  }, [props.isCreatingNew])
  
  return (
    <div className='vote-controls'>
      <div className='resbar__filter'>
        <input className='resbar__dropdown-button' value={`# of categories: ${categoryCount}`} type='button' />
        <FiChevronDown className='resbar__dropdown-arrow' />
        <select
          name='catagories'
          className='resbar__dropdown'
          onChange={(e)=>{handleFilter(e.target.value)}}
          value={categoryCount}
        >
          {
            //populating filters
            filterCategories.map((value)=>{
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