import { StringifyOptions } from 'querystring';
import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { GiConsoleController, GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import toggleDimmer from '../utils/toggleDimmer';

interface Props{
  isCreatingNew: boolean;
  setIsCreatingNew: any;
  votingCategories: any;
  addVotingCategoryAtIndex: any;
  pushVotingCategory: any;
  updateVotingCategory: any;
  createRegexListener: any;
  slotIndex: number | undefined;
  setSlotIndex: any;
  prefix: string;
  setPrefix: any;
  handlePrefixChange: (newPrefix: string, currentPrefix: string, setPrefix: any, maxPrefixLength: number)=>void;
  replacePrefix: (prefix: string) => void;
  maxPrefixLength: number;
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
      hex: '#fffbf2'
    },
    {
      name: 'black',
      hex: '#1d2122'
    },
    {
      name: 'random',
      hex: 'transparent'
    },
  ];

  const maxNameLength = 16;
  const [name, setName] = useState<string>('');
  const [color, setColor] = useState<{ name: string, hex: string }>({ name: '', hex: '' });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [localPrefix, setLocalPrefix] = useState<string>(props.prefix);

  useEffect(()=>{
    if(props.slotIndex != undefined && props.votingCategories[props.slotIndex] != undefined){
      setName(props.votingCategories[props.slotIndex].name)
      setColor(props.votingCategories[props.slotIndex].color)
      setIsEditing(true);
    }  
    if(props.isCreatingNew && localPrefix != props.prefix){
      setLocalPrefix(props.prefix);
    }
    toggleDimmer(props.isCreatingNew);
  }, [props.isCreatingNew]);

  useEffect(()=>{
    setLocalPrefix(props.prefix);
  }, [props.prefix])

  const handleNameUpdate = (name: string) =>{
    if(name.length <= maxNameLength){
      setName(name);
    }
  }

  const resetPrompt = () =>{
    setName('');
    setColor({name: '', hex: ''});
    props.setSlotIndex(undefined);
    setIsEditing(false);
  }

  const popupAddCategory = (popupData: { name: string, color: { name: string, hex: string } }) =>{
    const hasSlotIndex: boolean = props.slotIndex != undefined;

    if(name != ''){
      // generate random unique color if none is chosen
      if(popupData.color.name == '' || popupData.color.hex == ''){
        const definedColors: any[] = props.votingCategories.filter((value: any)=>{
          return value!=undefined;
        }).map((value: any)=>value.color.name);

        const freeColors = colors.slice(0, colors.length-1).filter((value: any)=>{
          return !definedColors.includes(value.name);
        })
        const randomColorIndex = Math.round(Math.random()*(freeColors.length-1));
        popupData.color = freeColors[randomColorIndex];
      }else if(popupData.color.name == 'random'){
        popupData.color = colors[Math.round(Math.random()*colors.length-1)];
      }
      
      if(hasSlotIndex){
        const category = {
          //@ts-ignore
          ...props.votingCategories[props.slotIndex],
          ...popupData
        }
        if(isEditing){
          //@ts-ignore
          const hasNameChanged = props.votingCategories[props.slotIndex].name != name;
          if(hasNameChanged){
            props.updateVotingCategory({ 
              ...category, 
              votes: [] 
            }, props.slotIndex);
          }else{
            props.updateVotingCategory(category, props.slotIndex);
          }
        }else{
          props.addVotingCategoryAtIndex({ 
            ...popupData, 
            votes: [], 
            regexListener: props.createRegexListener(popupData) 
          }, props.slotIndex);
        }
      }else{
        props.pushVotingCategory({ 
          ...popupData, 
          votes: [], 
          regexListener: props.createRegexListener(popupData)
        });
      }
      handlePopupClose();
    }
  }

  const handleKeyDown = (key: any) =>{
    const hasName = name != '';
    if(key == 'Enter' && hasName){
      popupAddCategory({ name: name, color: color });
    }else if(key == 'Escape'){
      handlePopupClose();
    }
  }

  const handlePopupClose = () =>{
    resetPrompt();
    props.setIsCreatingNew(false);
  }

  const handlePopupConfirm = () =>{
    if(name.replaceAll(' ', '').length != 0){
      popupAddCategory({ name: name, color: color })
      if(localPrefix != props.prefix){
        props.replacePrefix(localPrefix);
      }
    }
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
              <div className='popup__title-input-container'>
                <input
                  type='text'
                  className='popup__prefix popup__input'
                  placeholder=''
                  value={localPrefix}
                  onChange={(e: any)=>props.handlePrefixChange(e.target.value, localPrefix, setLocalPrefix, props.maxPrefixLength)}
                />
                <input 
                  type="text" 
                  className="popup__name popup__input"
                  placeholder='Title'
                  value={name}
                  autoFocus={true}
                  onChange={(e: any)=>handleNameUpdate(e.target.value)}
                  onKeyDownCapture={(e: any)=>{handleKeyDown(e.key)}}
                /> 
              </div>
                <span className='popup__character-count'>
                  {name.length} / {maxNameLength}
                </span>
               <div className="popup__footer">
                <div 
                  className="popup__color-selector"
                > 
                  {
                    colors.map((value: any, index: number)=>{
                      return (
                        <div 
                          className={`color-selector__color ${value.name == 'random' && 'color-selector__random'} ${value.name == color.name && 'color-selector__color--selected'}`} 
                          style={{backgroundColor: `${value.hex}`}}
                          data-color={value.name}
                          onClick={(e: any)=>setColor({name: e.target.dataset.color, hex: value.hex})}
                          key={index}
                        >
                          {
                            value.name == 'random'&&
                            <GiPerspectiveDiceSixFacesRandom />
                          }
                        </div>
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
                    onClick={()=>handlePopupConfirm()}
                  />
                </div>
               </div>
            </div>
          </div>
      }
    </>
  );
}

export default NewCategoryPopup;
