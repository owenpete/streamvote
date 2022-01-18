import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const VoteControls = () =>{
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
    </div>
  );
}

export default VoteControls;