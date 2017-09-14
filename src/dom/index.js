let findElement = (selector, callback) => {
  let element = document.querySelector(selector);
  if(!!element){
    callback();
  } else {
    setTimeout(() => {
      findElement(selector, callback);
    },200);
  }
}

export default {
  findElement
}