import { StringifyOptions } from 'querystring';
import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { GiConsoleController, GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';

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

  useEffect(()=>{
    if(props.slotIndex != undefined && props.votingCategories[props.slotIndex] != undefined){
      setName(props.votingCategories[props.slotIndex].name)
      setColor(props.votingCategories[props.slotIndex].color)
      setIsEditing(true);
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
                    onClick={()=>popupAddCategory({ name: name, color: color })}
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