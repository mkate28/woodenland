// AOS animation
AOS.init({
   offset: 120,
   duration: 900,
 });

// бургер-меню
const header = document.querySelector('.header');
const burger = document.querySelector('.menu__burger');
const menuMobile = document.querySelector('.menu__mobile');
const menuMobileItems = menuMobile.querySelectorAll('.menu__list-item');
const menuMobileLinks = menuMobile.querySelectorAll('.menu__list-link');

burger.addEventListener('click', () => {
   burger.classList.toggle('menu__burger--active');
   menuMobile.classList.toggle('menu__mobile--open');
   document.body.classList.toggle('locked');
   if (burger.classList.contains('menu__burger--active')) {
      menuMobile.style.top = header.offsetHeight + 'px';
      burger.setAttribute('aria-label', 'Закрыть меню');
      burger.setAttribute('aria-expended', 'true');
   } else {
      burger.setAttribute('aria-label', 'Открыть меню');
      burger.setAttribute('aria-expended', 'false');
   }
});
menuMobileLinks.forEach(link => {
   link.addEventListener('click', () => {
      if (burger.classList.contains('menu__burger--active')) {
       burger.classList.remove('menu__burger--active');
       menuMobile.classList.remove('menu__mobile--open');
       document.body.classList.remove('locked');
     }
   });
});

// подсветка активного пункта меню
const menuItems = document.querySelectorAll('.menu__list-item');
const menuLinks = document.querySelectorAll('.menu__list-link');
window.addEventListener('scroll', () => {
   const {top, bottom} = document.querySelector('.hero').getBoundingClientRect();
   if (top === 0 || bottom === window.innerHeight) {
      menuItems[0].querySelector('.menu__list-link').classList.remove('menu__list-link--active');
      menuMobileItems[0].querySelector('.menu__list-link').classList.remove('menu__list-link--active');
   }
   let scrollDistance = window.scrollY;
   document.querySelectorAll('.page-section').forEach((el, i) => {
      if (scrollDistance >= el.offsetTop - window.innerHeight / 2) {
         menuLinks.forEach(link => {
            if (link.classList.contains('menu__list-link--active')) {
               link.classList.remove('menu__list-link--active');
            }
         });
         menuItems[i].querySelector('.menu__list-link').classList.add('menu__list-link--active');
         menuMobileItems[i].querySelector('.menu__list-link').classList.add('menu__list-link--active');
      }  
   });
})

// смена карточек при наведении
const cards = document.querySelectorAll('.card');
cards.forEach(el => {
   let currentCard = el;
   const imageSwitchItems = currentCard.querySelectorAll('.img-switch__item');
   const imagePagination = currentCard.querySelector('.img-pagination');
   if (imageSwitchItems.length > 1) {
      imageSwitchItems.forEach((el, index) => {
         el.dataset.index = index;
         imagePagination.innerHTML += `<li class="img-pagination__item ${index == 0 ? 'img-pagination__item--active' : ''}" data-index="${index}"></li>`;
         el.addEventListener('mouseenter', (e) => {
            currentCard.querySelectorAll('.img-pagination__item').forEach(el => {el.classList.remove('img-pagination__item--active')});
            currentCard.querySelector(`.img-pagination__item[data-index="${e.currentTarget.dataset.index}"]`).classList.add('img-pagination__item--active');
         });

         el.addEventListener('mouseleave', () => {
            currentCard.querySelectorAll('.img-pagination__item').forEach(el => {el.classList.remove('img-pagination__item--active')});
            currentCard.querySelector(`.img-pagination__item[data-index="0"]`).classList.add('img-pagination__item--active');
         });
      });
   }
});	

// select 
const btn = document.querySelector('.select__btn');
const selectList = document.querySelector('.select__options-list');
const selectItems = selectList.querySelectorAll('.select__options-item');
const input = document.querySelector('.select__input');

btn.addEventListener('click', (e) => {
   e.preventDefault();
   selectList.classList.toggle('select__options-list--visible');
   btn.classList.add('select__btn--active');
});
selectItems.forEach(item => {
   item.addEventListener('click', (e) => {
     e.stopPropagation();
     btn.innerText = e.target.innerText;
     btn.focus();
     selectList.classList.remove('select__options-list--visible');
     input.value = e.target.dataset.value;
   });
});
document.addEventListener('click', (e) => {
   if (e.target !== btn) {
     selectList.classList.remove('select__options-list--visible');
     btn.classList.remove('select__btn--active');
   }
});
document.addEventListener('keydown', (e) => {
   if (e.key === 'Tab' || e.key === 'Escape') {
      selectList.classList.remove('select__options-list--visible');
      btn.classList.remove('select__btn--active');
   }
});

// stepper 
const stepperInput = document.querySelector('.stepper__field');
const stepperBtnUp = document.querySelector('.stepper__btn--up');
const stepperBtnDown = document.querySelector('.stepper__btn--down');
let count = stepperInput.value;

function disableUpBtn(count) {
   if (count == 8) {
      stepperBtnUp.classList.add('stepper__btn--disabled');
   } else {
      stepperBtnUp.classList.remove('stepper__btn--disabled');
   }
}
function disableDownBtn(count) {
   if (count == 1) {
      stepperBtnDown.classList.add('stepper__btn--disabled');
   } else {
      stepperBtnDown.classList.remove('stepper__btn--disabled');
   }
}

stepperInput.addEventListener('input', (e) => {
	let self = e.currentTarget;
	if (self.value === '0') self.value = 1;
   if (+self.value > 8) self.value = 8;
	count = stepperInput.value;
   disableUpBtn(count);
   disableDownBtn(count);
});
stepperInput.addEventListener('change', (e) => {
	if (!e.currentTarget.value) e.currentTarget.value = 1;
	count = stepperInput.value;
   disableDownBtn(count);
});
stepperBtnUp.addEventListener('click', (e) => {
	e.preventDefault();
	count++;
   disableUpBtn(count);
   disableDownBtn(count);
	stepperInput.value = count;
});
stepperBtnDown.addEventListener('click', (e) => {
	e.preventDefault();
	count--;
   disableUpBtn(count);
   disableDownBtn(count);
	stepperInput.value = count;
});

// аккордеон с вопросами
const questionItems = document.querySelectorAll('.question__item');
questionItems.forEach(el => {
   el.addEventListener('click', (e) => {
      const currentItem = e.currentTarget;
      const control = currentItem.querySelector('.question__item-control');
      const content = currentItem.querySelector('.question__item-text');
      currentItem.classList.toggle('question__item--open');
      if (currentItem.classList.contains('question__item--open')) {
         control.setAttribute('aria-expended', true);
         content.setAttribute('aria-hidden', false);
         content.style.maxHeight = content.scrollHeight + 'px';
      } else {
         control.setAttribute('aria-expended', false);
         content.setAttribute('aria-hidden', true);
         content.style.maxHeight = null;
      }
   });
});

// показать еще
const show = document.querySelector('.show-btn');
const images = Array.from(document.querySelectorAll('.gallery__item'));
let items = 5;
show.addEventListener('click', () => {
   items += 3;
   const visItems = images.slice(0, items);
   visItems.forEach(el => {
      el.style.display = 'block';
   });
   if (visItems.length === images.length) {
      show.style.display = 'none';
      document.querySelector('.gallery__wrapper').style.paddingBottom = 0;
   }
});

// открытие изображения галереи
const imgItems = document.querySelectorAll('.gallery__item');
const imgBox = document.querySelector('.gallery__wrapper');
const fullImg = document.querySelector('.full__img');
const closeImg = document.querySelector('.close-img');
imgBox.addEventListener('click', (e) => {
   if (e.target.classList.contains('gallery__item')) {
      const src = getComputedStyle(e.target)['background-image'];
      document.querySelector('.full__img-item').style.backgroundImage = src;
      fullImg.style.display = "flex";
      document.body.classList.add('locked');
   }
});
closeImg.addEventListener('click', () => {
   fullImg.style.display = null;
   document.body.classList.remove('locked');
});
fullImg.addEventListener('click', (e) => {
   if(e.target.classList.contains('full__img')) {
      fullImg.style.display = null;
      document.body.classList.remove('locked');
   }
});

// подключение Яндекс карты
function init() {
   let map = new ymaps.Map('map', {
      center: [57.083431521984735,60.18526438114584],
      zoom: 11
   });
   map.controls.remove('geolocationControl'); 
   map.controls.remove('searchControl'); 
   map.controls.remove('trafficControl'); 
   map.controls.remove('zoomControl'); 
   map.behaviors.disable(['scrollZoom']); 
}
ymaps.ready(init);

// модальные окна
const modals = document.querySelectorAll('.modal');
const cabinModal = document.querySelector('#cabin-modal');
const bookModal = document.querySelector('#book-modal');
const orderModal = document.querySelector('#order-modal');
const closeModal = document.querySelectorAll('.modal__close');
const closeBtn = document.querySelector('.btn-close');
const orderBtn = document.querySelector('.modal__form-btn');
const modalBtn = cabinModal.querySelector('.modal__btn');
const bookBtn = document.querySelector('.form__btn');
const mailInput = document.querySelector('#mail');
const errorMessage =  document.querySelector('.modal__error-msg');

cards.forEach(el => {
   el.addEventListener('click', (e) => {
      const cabin = el.querySelector('.card__title').innerText;
      const descr = el.querySelector('.card__info-descr').innerText;
      const priceWeek = Number(el.querySelector('.card__price-value').innerText);
      const priceWeekend = priceWeek + 1000;
      if (e.target.classList.contains('card__buttons-more')) {
         document.body.classList.add('locked');
         cabinModal.classList.remove('visually-hidden');
         cabinModal.querySelector('.modal__title').innerText = cabin;
         cabinModal.querySelector('.modal__description').innerText = descr + ' Все удобства включены в стоимость аренды.';
         cabinModal.querySelector('.modal__price-week').innerText = priceWeek;
         cabinModal.querySelector('.modal__price-weekend').innerText = priceWeekend;
      }
      if (e.target.classList.contains('card__buttons-choose')) {
         document.body.classList.add('locked');
         bookModal.classList.remove('visually-hidden');
      }
   });
}); 

function closeModals() {
   cabinModal.classList.add('visually-hidden');
   bookModal.classList.add('visually-hidden');
   orderModal.classList.add('visually-hidden');
   document.body.classList.remove('locked');
   mailInput.value = '';
   errorMessage.classList.add('visually-hidden');
}
closeModal.forEach(el => {
   el.addEventListener('click', () => closeModals());
});
modals.forEach(el => {
   el.addEventListener('click', (e) => {
     if (e.target.classList.contains('modal__container')) closeModals();
   });
});
closeBtn.addEventListener('click', () => {
   orderModal.classList.add('visually-hidden');
   document.body.classList.remove('locked');
});
modalBtn.addEventListener('click', () => {
   cabinModal.classList.add('visually-hidden');
   bookModal.classList.remove('visually-hidden');
});
bookBtn.addEventListener('click', (e) => {
   e.preventDefault();
   if (input.value && document.querySelector('.date__field').value) {
      bookModal.classList.remove('visually-hidden');
      document.body.classList.add('locked');
   }
});
orderBtn.addEventListener('click', (e) => {
   e.preventDefault();
   if (mailInput && mailInput.value.includes('@')) {
      bookModal.classList.add('visually-hidden');
      orderModal.classList.remove('visually-hidden');
      mailInput.value = '';
      errorMessage.classList.add('visually-hidden');
   } else {
      errorMessage.classList.remove('visually-hidden');
   }
});