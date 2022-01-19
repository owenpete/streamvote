import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';

interface Props{
  isCreatingNew: boolean;
  setIsCreatingNew: any;
  addVotingCategory: any;
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

  const [name, setName] = useState<string>('');
  const [color, setColor] = useState<string>('');

  const resetPrompt = () =>{
    setName('');
    setColor('');
  }

  const popupAddCategory = (name: string, color: string, setName: any, setColor: any) =>{
    props.addVotingCategory({ name: name, color: color })
    resetPrompt();
    props.setIsCreatingNew(false);
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
                onChange={(e: any)=>setName(e.target.value)}
               /> 
              <div 
                className="popup__color-selector"
               > 
                {
                  colors.map((value: any)=>{
                    return (
                      <div 
                        className='color-selector__color' 
                        style={{backgroundColor: `${value.hex}`}}
                        data-color={value.hex}
                        onClick={(e: any)=>setColor(e.target.dataset.color)}
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
                  onClick={()=>popupAddCategory(name, color, setName, setColor)}
                />
               </div>
            </div>
          </div>
      }
    </>
  );
}

export default NewCategoryPopup;