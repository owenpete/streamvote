import { useEffect } from 'react';

interface Props{
  isCreatingNew: boolean;
}

const NewCategoryPopup = (props: Props) =>{
  return (
    <>
      {
        props.isCreatingNew&&
          <div className='new-category'>

          </div>
      }
    </>
  );
}

export default NewCategoryPopup;