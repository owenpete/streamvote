import { useEffect, useState } from 'react';
import { FiChevronDown, FiX, FiCheck, FiRotateCw } from 'react-icons/fi';
import toggleDimmer from '../utils/toggleDimmer';

interface Props{
  isOpen: boolean;
  setIsOpen: any;
  prefix: string;
  setPrefix: any;

  addVotingCategory: any;
  setIsCreatingNew: any;
  isCreatingNew: boolean;
  categoryCount: number;
  setCategoryCount: any;
  categoryOptions: any;
  handleFilter: any;
}

const MainMenu = (props: Props) =>{
  const [localPrefix, setLocalPrefix] = useState<string>(props.prefix);
  const maxPrefixLength: number = 1;
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

  const handlePrefixChange = (newPrefix: string, currentPrefix: string) =>{
    if(currentPrefix.length < maxPrefixLength){
      setLocalPrefix(newPrefix[0]);
    }else if(newPrefix == ''){
      setLocalPrefix('');
    }
  }

  const handlePrefixSubmit = (prefix: string) =>{
    props.setPrefix(prefix);
  }

  const submitPrefix = () =>{
    props.setPrefix(localPrefix);
  }

  const handleKeyDown = (key: string) =>{
    if(key == 'Enter' && props.prefix != localPrefix){
      submitPrefix();
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
      <label className='prefix__label' htmlFor='prefix-input'>Prefix:</label>
      <div className='main-menu__prefix-container'>
        <div className='prefix__input-container'>
          <input 
            className='prefix__input'
            id='prefix-input'
            onChange={(e: any)=>handlePrefixChange(e.target.value, localPrefix)}
            onKeyDownCapture={(e: any)=>handleKeyDown(e.key)}
            value={localPrefix}
            type='text'
            placeholder='Leave empty for no prefix'
          />
          <span className='prefix__character-count'>
            {localPrefix.length}/{maxPrefixLength}
          </span>
        </div>
        <div className='prefix__actions'>
          <div 
            className={`prefix__container-confirm prefix__icon-container ${props.prefix == localPrefix ? 'prefix--default' : ''}`}
          >
            <FiCheck
              className='prefix__confirm prefix__icon'
              onClick={(e: any)=>handlePrefixSubmit(localPrefix)}
            />
          </div>
          <div 
            className={`prefix__container-reset prefix__icon-container ${props.prefix == localPrefix ? 'prefix--default' : ''}`}
          >
            <FiRotateCw
              className='prefix__reset prefix__icon'
              onClick={(e: any)=>setLocalPrefix(props.prefix)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainMenu;