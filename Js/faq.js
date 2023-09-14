function flex(){
  let word = document.querySelector('body > header > nav > .linklist > a.highlighted').textContent;
  if(word === 'FAQ'){
    document.onclick = ()=> {
      let container = document.getElementsByClassName('content')[0];
      let accordionNum = document.querySelectorAll('.accordion-button.collapsed').length;
      if(accordionNum<=3){
        container.style.alignItems='center';
      }
      else{
        container.style.alignItems='flex-start';
      }
    }
  }
  load();
}