import { useEffect } from 'react';
import { FiChevronDown, FiX } from 'react-icons/fi';
import toggleDimmer from '../utils/toggleDimmer';

interface Props{
  isOpen: boolean;
  setIsOpen: any;

  addVotingCategory: any;
  setIsCreatingNew: any;
  isCreatingNew: boolean;
  categoryCount: number;
  setCategoryCount: any;
  categoryOptions: any;
  handleFilter: any;
}

const MainMenu = (props: Props) =>{
  useEffect(()=>{
    toggleDimmer(props.isOpen);
    handleMenuOpen(props.isOpen);
  }, [props.isOpen]);
  
  const handleMenuOpen = (isOpen: boolean) =>{
    const menuElement: any = document.getElementById('menu'); 
    if(isOpen){
      menuElement.style.transform = 'translate(0)';
    }else{
      menuElement.style.transform = 'translate(-100%)';
    }
  }

  return (
    <div className='main-menu' id='menu'>
      <FiX 
        className='main-menu__exit-icon' 
        onClick={(e: any)=>props.setIsOpen(false)}
      />
      <div className='vote-controls__dropdown-container'>
        <input className='vote-controls__dropdown-button' value={`# of categories: ${props.categoryCount}`} type='button' />
        <FiChevronDown className='vote-controls__dropdown-arrow' />
        <select
          name='catagories'
          className='vote-controls__dropdown'
          onChange={(e)=>{
            props.handleFilter(e.target.value);
            props.setIsOpen(false);
          }}
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
    </div>
  );
}

export default MainMenu;