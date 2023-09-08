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
}
