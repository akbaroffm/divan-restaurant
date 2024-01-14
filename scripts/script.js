'use strict';



/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});

var telegram_bot_id = "6918241709:AAFkVcEERE1eXWMDk3avVs--N9yNxaiZWyE";

var chat_id = -1002045060375;
var u_name, phone, select, filial, hall, date, time, message;
var ready = function() {
    u_name = document.getElementById("name").value;
    phone = document.getElementById("phone").value;
    select = document.getElementById("person").value;
    filial = document.getElementById("filial").value;
    hall = document.getElementById("hall").value;
    date = document.getElementById("reservation-date").value;
    time = document.getElementById("time").value;
    message = document.getElementById("message").value;
    message = "Ismi: " + u_name + "\nRaqami: " + phone + "\nKishilar soni: " + select + "\nFilial: " + filial + "\nJoylashuvi: " + hall + "\nSana: " + date + "\nSoat: " + time + "\nIzoh: " + message;
};
var sendtelegram = function() {
    ready();
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.telegram.org/bot" + telegram_bot_id + "/sendMessage",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache"
        },
        "data": JSON.stringify({
            "chat_id": chat_id,
            "text": message
        })
    };
    $.ajax(settings).done(function(response) {
        console.log(response);
        alert("Buyurtmangiz qabul qilindi");
    });
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("person").value = "";
    document.getElementById("filial").value = "";
    document.getElementById("hall").value = "";
    document.getElementById("reservation-date").value = "";
    document.getElementById("time").value = "";
    document.getElementById("message").value = "";
    return false;
};
function showAnimatedAlert() {
  var u_name = document.getElementById("name").value;
  var phone = document.getElementById("phone").value;
  var reservationDate = document.getElementById("reservation-date").value;

  // Tekshirish: Agar malumotlar kiritilmagan bo'lsa
  if (u_name.trim() === "" || phone.trim() === "" || reservationDate.trim() === "") {
      // Animatsiyali xato alert
      Swal.fire({
          title: "Xato!",
          text: "Ismingiz, telefon raqamingiz va sanangizni to'liq kiriting.",
          icon: "error",
          confirmButtonText: "Qaytadan kiriting",
          showClass: {
              popup: 'animate__animated animate__shakeX'
          }
      });

      // Formani yuborishni to'xtatish
      return false;
  }

  // Animatsiyali alert
  Swal.fire({
      title: "Buyurtma qabul qilindi!",
      text: "Rahmat! Menedjerlarimiz bir necha daqiqadan so'ng siz bilan bog'lanishadi",
      icon: "success",
      confirmButtonText: "Davom eting",
      showClass: {
          popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
      }
  });

  // Default alertni yo'q qilish
  window.alert = function() {};

  // Formani yuborishni to'xtatish
  return false;
}
function validateForm() {
  var nameInput = document.getElementById('name');
  var phoneInput = document.getElementById('phone');

  // Lotin va kiril harflarini qabul qilish
  var nameRegex = /^[A-Za-z\u0400-\u04FF\s]+$/;
  // + belgisi va raqamlarni qabul qilish
  var phoneRegex = /^[0-9+]+$/;

  // Tekshirish
  if (!nameRegex.test(nameInput.value)) {
      alert('Faqat lotin va kiril harflar qabul qilinadi');
      return false;
  }

  if (!phoneRegex.test(phoneInput.value)) {
      alert('Faqat raqamlar qabul qilinadi');
      return false;
  }

  // Yordamchi funksiya false qaytarish orqali formani to'xtatish
  return true;
}
var translations = {
  'uz': {
      'welcome': 'Tashrif buyuring',
      'address': 'Sodiq Azimov ko\'chasi 49A, Abay ko\'chasi 12',
      'openingHours': 'Har kuni: 08:00 dan 00:00 gacha',
      'phoneNumber1': '71 233 10 80',
      'phoneNumber2': '95 476 19 19',
      'instagramLink': 'divan.rest',
      'reservation': 'Bron qilish',
      'nav-home': 'Bosh sahifa',
      'nav-menu': 'Menu',
      'nav-about': 'Biz haqimizda',
      'nav-chef': 'Cheff',
      'nav-contact': 'Aloqa',
      'home-title': 'Turk Taomlari',
      'home-discription': 'Oilangiz bilan keling va mazali taomdan zavqlaning',
      'menu-button': '"Menu"ni ko\'rish',
      'reserve-table': 'Stol bron qilish',
      'european-dishes': 'Yevropa taomlari',
      'come-with-family': 'Oilangiz bilan keling va mazali taomdan zavqlaning',
      'awesome-atmosphere': 'Ajoyib atmosfera',
      'come-with-family': 'Oilangiz bilan keling va mazali taomdan zavqlaning',
  },
  'ru': {
      'welcome': 'Добро пожаловать',
      'address': 'улица Содик Азимова 49А, улица Абая 12',
      'openingHours': 'Ежедневно: с 08:00 до 00:00',
      'phoneNumber1': '71 233 10 80',
      'phoneNumber2': '95 476 19 19',
      'instagramLink': 'divan.rest',
      'reservation': 'Бронирование стола',
      'nav-home': 'Главная',
      'nav-menu': 'Меню',
      'nav-about': 'О нас',
      'nav-chef': 'Повары',
      'nav-contact': 'Контакты',
      'home-title': 'Турецкая кухня',
      'home-discription': 'Приходите с семьей и наслаждайтесь вкусной едой',
      'menu-button': 'Посмотреть меню',
      'reserve-table': 'Брон... стола',
      'european-dishes': 'Европейские блюда',
      'come-with-family': 'Приходите с семьей и наслаждайтесь вкусной едой',
      'awesome-atmosphere': 'Удивительная атмосфера',
      'come-with-family': 'Приходите с семьей и наслаждайтесь вкусной едой',
  },
  'en': {
      'welcome': 'Welcome',
      'address': 'Sodiq Azimov Street 49A, Abay Street 12',
      'openingHours': 'Everyday: 08:00 AM to 12:00 AM',
      'phoneNumber1': '71 233 10 80',
      'phoneNumber2': '95 476 19 19',
      'instagramLink': 'divan.rest',
      'revervation': 'Reserve a table',
      'nav-home': 'Home',
      'nav-menu': 'Menu',
      'nav-about': 'About Us',
      'nav-chef': 'Cheff',
      'nav-contact': 'Contact',
      'home-title': 'Turkish Cuisine',
      'home-discription': 'Come with your family and enjoy delicious food',
      'menu-button': 'View Menu',
      'reserve-table': 'Reserve a Table',
      'european-dishes': 'European Dishes',
      'come-with-family': 'Come with your family and enjoy delicious food',
      'awesome-atmosphere': 'Awesome Atmosphere',
      'come-with-family': 'Come with your family and enjoy delicious food',
  },
  'tr': {
      'welcome': 'Hoş geldiniz',
      'address': 'Sodiq Azimov Caddesi 49A, Abay Caddesi 12',
      'openingHours': 'Her gün: 08:00 - 00:00',
      'phoneNumber1': '71 233 10 80',
      'phoneNumber2': '95 476 19 19',
      'instagramLink': 'divan.rest',
      'reservation': 'Masa Rezervasyonu',
      'nav-home': 'Ana Sayfa',
      'nav-menu': 'Menü',
      'nav-about': 'Hakkımızda',
      'nav-chef': 'Şef',
      'nav-contact': 'İletişim',  
      'home-title': 'Türk Mutfağı',
      'home-discription': 'Ailenizle gelin ve lezzetli yemeklerin tadını çıkarın',
      'menu-button': '"Menü"yü görüntüle',
      'reserve-table': 'Masa Rezerv...',
      'european-dishes': 'Avrupa Yemekleri',
      'come-with-family': 'Ailenizle gelin ve lezzetli yemeklerin tadını çıkarın',
      'awesome-atmosphere': 'Harika Atmosfer',
      'come-with-family': 'Ailenizle gelin ve lezzetli yemeklerin tadını çıkarın',
  }
};


// function setLanguage(language) {
//   var elements = document.querySelectorAll('[data-translate]');
//   elements.forEach(function (element) {
//       var key = element.getAttribute('data-translate');
//       element.textContent = translations[language][key];
//   });
// }

document.addEventListener('DOMContentLoaded', function () {
  setLanguage('uz'); // Set the default language
});

function setLanguage(language) {
  var elements = document.querySelectorAll('[data-translate]');
  elements.forEach(function (element) {
      var key = element.getAttribute('data-translate');
      if (key in translations[language]) {
          element.textContent = translations[language][key];
      }
  });
}
// translate end