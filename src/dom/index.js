'use strict';

let createElement = (element, attriburtesArray, text) => {
  let newElement = document.createElement(element);
  if(!!attriburtesArray){
    for(let i = 0; i < attriburtesArray.length; i++){
      newElement.setAttribute(attriburtesArray[i].name, attriburtesArray[i].val);
    }
  }
  if(!!text){
    newElement.innerHTML = text;
  }
  return newElement;
}



export default {
  createElement: createElement
}