import { StringifyOptions } from 'querystring';
import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';

interface Props{
  isCreatingNew: boolean;
  setIsCreatingNew: any;
  votingCategories: any;
  addVotingCategory: any;
  pushVotingCategory: any;
  slotIndex: number | undefined;
  setSlotIndex: any;
}

const NewCategoryPopup = (props: Props) =>{

  const colors = [
    {
      name: 'red',
      hex: '#ff6d57'
    },
    {
      name: 'orange',
      hex: '#eb9646'
    },
    {
      name: 'yellow',
      hex: '#ffdc40'
    },
    {
      name: 'green',
      hex: '#9fff67'
    },
    {
      name: 'blue',
      hex: '#78c1ff'
    },
    {
      name: 'purple',
      hex: '#a596ff'
    },
    {
      name: 'white',
      hex: '#ffffff'
    },
    {
      name: 'black',
      hex: '#000000'
    },
  ];

  const maxNameLength = 16;
  const [name, setName] = useState<string>('');
  const [color, setColor] = useState<{ name: string, hex: string }>({ name: '', hex: '' });

  useEffect(()=>{
    console.log(props)
    if(props.slotIndex != undefined && props.votingCategories[props.slotIndex] != undefined){
      setName(props.votingCategories[props.slotIndex].name)
      setColor(props.votingCategories[props.slotIndex].color)
    }  }, [props.isCreatingNew])

  const handleNameUpdate = (name: string) =>{
    if(name.length < maxNameLength){
      setName(name);
    }
  }

  const resetPrompt = () =>{
    setName('');
    setColor({name: '', hex: ''});
    props.setSlotIndex(undefined);
  }

  const popupAddCategory = (name: string, color: { name: string, hex: string }) =>{
    if(name != '' && color.name != ''){
      if(props.slotIndex){
        props.addVotingCategory({ name: name, color: color }, props.slotIndex);
      }else{
        props.pushVotingCategory({ name: name, color: color });
      }
      resetPrompt();
      props.setIsCreatingNew(false);
    }
  }

  const handlePopupClose = () =>{
    resetPrompt();
    props.setIsCreatingNew(false);
  }

  return (
    <>
      {
        props.isCreatingNew&&
          <div className='new-category'>
            <div className='new-category__popup'>
              <div className='popup__header'>
                <span className='header__title'>Add New Category</span>
                <FiX 
                  className='header__exit'
                  onClick={()=>handlePopupClose()}
                />
              </div>
              <input 
                type="text" 
                className="popup__name"
                placeholder='Title'
                value={name}
                autoFocus={true}
                onChange={(e: any)=>handleNameUpdate(e.target.value)}
               /> 
              <div 
                className="popup__color-selector"
               > 
                {
                  colors.map((value: any)=>{
                    return (
                      <div 
                        className={`color-selector__color ${value.name == color.name && 'color-selector__color--selected'}`} 
                        style={{backgroundColor: `${value.hex}`}}
                        data-color={value.name}
                        onClick={(e: any)=>setColor({name: e.target.dataset.color, hex: value.hex})}
                      ></div>
                    )
                  })
                } 
               </div>
               <div className='popup__actions'>
                <input 
                  type="button"
                  value='Cancel'  
                  className='actions__cancel actions'
                  onClick={()=>handlePopupClose()}
                />
                <input 
                  type="button"
                  value='Confirm'
                  className='actions__confirm actions'
                  onClick={()=>popupAddCategory(name, color)}
                />
               </div>
            </div>
          </div>
      }
    </>
  );
}

export default NewCategoryPopup;