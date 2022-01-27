const toggleDimmer = (isEnabled: boolean) =>{
  const dimmerElement: HTMLElement = document.getElementById('dimmer')!;
    if(isEnabled){
      dimmerElement.style.backgroundColor='hsla(0, 0%, 0%, 35%)';
      dimmerElement.style.pointerEvents='none';
    }else{
      dimmerElement.style.backgroundColor='';
      dimmerElement.style.pointerEvents='';
    }
}

export default toggleDimmer;