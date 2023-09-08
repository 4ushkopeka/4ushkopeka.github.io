function load(){
    let burger = document.getElementsByClassName('fa-bars')[0];
    let x = document.getElementsByClassName('fa-times')[0];
    burger.addEventListener('click', e => openNav());
    x.addEventListener('click', e => closeNav());

    function openNav() {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("mySidenav").style.padding = "2rem";
        burger.classList.add('animate');
        burger.classList.remove('unanimate');
      }
      
      function closeNav() {
        document.getElementById("mySidenav").style.width = "0%";
        document.getElementById("mySidenav").style.padding = "0px";
        burger.classList.add('unanimate');
        burger.classList.remove('animate');
      }

      var prevScrollpos = window.scrollY;
      window.onscroll = function() {
        var currentScrollPos = window.scrollY;
        if (prevScrollpos > currentScrollPos) {
          document.getElementsByTagName("header")[0].style.top = "0.5rem";
        } else {
          document.getElementsByTagName("header")[0].style.top = "-300px";
        }
        prevScrollpos = currentScrollPos;
      }   
      let faq = document.querySelector('body > header > nav > ul > a.highlighted');
      if(faq.textContent === 'FAQ'){
        window.onclick = () => setTimeout(footerFunc, 355);

    }

    function footerFunc(){
        let openedAcc = document.getElementsByClassName('show');
        let footer = document.getElementsByTagName('footer')[0];
        console.log(openedAcc.length);
        if(openedAcc.length>=1){
          footer.style.transform='translateY(15vh)';
        }
        else{
          footer.style.transform='translateY(0vh)';
        }
      }
}
