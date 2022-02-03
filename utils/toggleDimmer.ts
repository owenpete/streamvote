const toggleDimmer = (isEnabled: boolean) =>{
  const dimmerElement: HTMLElement = document.getElementById('dimmer')!;
    if(isEnabled){
      dimmerElement.style.backgroundColor='hsla(0, 0%, 0%, 35%)';
      dimmerElement.style.pointerEvents='auto';
    }else{
      dimmerElement.style.backgroundColor='';
      dimmerElement.style.pointerEvents='none';
    }
}

export default toggleDimmer;