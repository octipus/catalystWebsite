window.onload=function(){

(function() {

  var Menu = (function() {
    var burger = document.querySelector('.burger');
    var menu = document.querySelector('.menu');
    var menuList = document.querySelector('.menu__list');
    var brand = document.querySelector('.menu__brand');
    var menuItems = document.querySelectorAll('.menu__item');
    var menuLinks = document.getElementsByClassName('menu__link');

    var active = false;

    var toggleMenu = function() {
      if (!active) {
        menu.classList.add('menu--active');
        menuList.classList.add('menu__list--active');
        brand.classList.add('menu__brand--active');
        burger.classList.add('burger--close');
        for (var i = 0, ii = menuItems.length; i < ii; i++) {
          menuItems[i].classList.add('menu__item--active');
        }

        active = true;
      } else {
        menu.classList.remove('menu--active');
        menuList.classList.remove('menu__list--active');
        brand.classList.remove('menu__brand--active');
        burger.classList.remove('burger--close');
        for (var i = 0, ii = menuItems.length; i < ii; i++) {
          menuItems[i].classList.remove('menu__item--active');
        }

        active = false;
      }
    };

    var pageDelay = function(e) {
        e.preventDefault();
        setTimeout(function(url) { window.location = url }, 400, this.href);
    };


    var bindActions = function() {
      burger.addEventListener('click', toggleMenu, false);
      menuList.addEventListener('click', toggleMenu, false);

      for(let i = 0; i < menuLinks.length; i++) {
        menuLinks[i].addEventListener("click", pageDelay)
      }
    };


    var init = function() {
      bindActions();
    };

    return {
      init: init
    };

  }());

  Menu.init();

}());
}

        // Fade in page Load
document.addEventListener("DOMContentLoaded", function(e) {
  document.body.classList.remove('fade');
});
      // Fade in page Unload
window.onbeforeunload = function() {
  document.body.classList.add('fade');
};