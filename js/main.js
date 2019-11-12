'use strict';

var adverts = []; // массив для объектов объявлений
var advertsCount = 8; // количество объявлений
var pinWidth = 50;
var pinHeight = 70;
var horizontalCoord = 0;
var verticalCoord = 0;
var map = document.querySelector('.map');

var types = [
  {
    'palace': 'Дворец'
      },
  {
    'flat': 'Квартира'
      },
  {
    'house': 'Дом'
      },
  {
    'bungalo': 'Бунгало'
      }
    ];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var times = ['12: 00', '13: 00', '14: 00'];

// найти в массиве свойство объекта без его значения
function typeProperty(obj) {
  var typeIndex = randomInteger(0, obj.length - 1);
  var objIndex = obj[typeIndex];

  return Object.keys(objIndex)[0];
}

function randomInteger(min, max) {
  // случайное число от min до (max+1)
  var randoms = min + Math.random() * (max + 1 - min);
  return Math.floor(randoms);
}

// создание массива с объектами
function createCards() {

  // создание массива с рандомной длинной и рандомными элементами из другого массива
  function createRandomArray(array) {
    var randomArray = []; // финальный массив
    var arrayIndex = 0; // индекс элемента, который нужно поместить в новый массив
    var randomArrayLength = randomInteger(1, array.length); // длинна финального массива

    while (randomArray.length < randomArrayLength) {
      arrayIndex = randomInteger(0, array.length - 1);
      var item = array[arrayIndex];

      if (randomArray.indexOf(item) === -1) {
        randomArray.unshift(item);
      }
    }
    return randomArray;
  }

  // создание координат метки c учетом размера пина
  function createCoordinats() {
    horizontalCoord = randomInteger(pinWidth, map.offsetWidth);
    verticalCoord = randomInteger(130, 630);
  }

  for (var i = 0; i < advertsCount; i++) {
    createCoordinats();

    var type = typeProperty(types);

    var ad = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': 'Заголовок', // строка, заголовок предложения
        'address': horizontalCoord + ', ' + verticalCoord, // location['y'], // + ',' + location.y, //строка, адрес предложения.Для простоты пусть пока представляет собой запись вида '{{location.x}}, {{location.y}}' например, '600, 350'
        'price': randomInteger(1000, 63000), // число,стоимость
        'type': type, // строка с одним из четырёх фиксированных значений: palace, flat,  house или bungalo
        'rooms': randomInteger(1, 10), // число,количество комнат
        'guests': randomInteger(1, 20), // число, количество гостей, которое можно разместить
        'checkin': times[randomInteger(0, times.length - 1)], // строка с одним из трёх фиксированных значений: 12: 00, 13: 00 или 14: 00,
        'checkout': times[randomInteger(0, times.length - 1)], // строка с одним из трёх фиксированных значений: 12: 00, 13: 00 или 14: 00
        'features': createRandomArray(features),
        'description': 'Описание', // строка с описанием,
        'photos': createRandomArray(photos)
      },
      'location': {
        'x': horizontalCoord,
        'y': verticalCoord
      }
    };
    //console.log(ad);
    adverts.push(ad);
  }
  // console.log(adverts);
  return adverts;
}
createCards();

// создание пина
function createPin(ad) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pin = pinTemplate.cloneNode(true);

  pin.style.left = ad.location['x'] - pinWidth + 'px';
  pin.style.top = ad.location['y'] - pinHeight + 'px';

  pin.querySelector('img').src = ad.author['avatar'];
  pin.querySelector('img').alt = ad.offer['title'];

  // console.log(ad.location['x'] + ', ' + ad.location['y']);
  return pin;
}

// добавление всех пинов на страницу
function renderPins() {
  var pinsList = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < advertsCount; i++) {
    fragment.appendChild(createPin(adverts[i]));
  }

  pinsList.appendChild(fragment);
}
renderPins();

// функция для склонений
function declOfNum(number, titles) {
  var cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

// создание карточки объявлений
function createCard(ad) {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var card = cardTemplate.cloneNode(true);

  card.querySelector('.popup__title').textContent = ad.offer.title;
  card.querySelector('.popup__text--address').textContent = ad.offer.address;
  card.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';

  // нахождение типа жилья в массиве
  for (var i = 0; i < types.length; i++) {
    var obj = types[i];
    var typeKey = Object.keys(obj)[0];

    if (typeKey === ad.offer.type) {
      var typeText = types[i][typeKey];
    }
  }

  card.querySelector('.popup__type').textContent = typeText;
  card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' ' + declOfNum(ad.offer.rooms, ['комната', 'комнаты', 'комнат']) + ' для ' + ad.offer.guests + ' ' + declOfNum(ad.offer.guests, ['гостя', 'гостей', 'гостей']);
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

  // удаляет пример удобства из темплейта
  var parent = card.querySelector('.popup__features')
  while (parent.firstChild) {
    parent.firstChild.remove();
  }

  // добавляет удобства
  for (var i = 0; i < ad.offer.features.length; i++) {
    var feature = document.createElement('li');
    feature.className = 'popup__feature popup__feature--' + ad.offer.features[i];
    //feature.textContent = ad.offer.features[i];
    card.querySelector('.popup__features').appendChild(feature);
  }

  card.querySelector('.popup__description').textContent = ad.offer.description;

  for (var i = 0; i < ad.offer.photos.length; i++) {
    var photo = card.querySelector('.popup__photos img').cloneNode(true);
    //console.log(ad.offer.photos);
    photo.src = ad.offer.photos[i];
    card.querySelector('.popup__photos').appendChild(photo);
  }

  card.querySelector('.popup__photos img:first-child').remove(); // удаляет пример фото из темплейта
  card.querySelector('.popup__avatar').src = ad.author.avatar;

  //console.log(card);
  return card;
}

function renderAdvertiseCard() {
  var pinsList = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  fragment.appendChild(createCard(adverts[0]));
  pinsList.after(fragment);
}

renderAdvertiseCard();

var adForm = document.querySelector('.ad-form');
var formElements = adForm.querySelectorAll('fieldset');
var mapFilters = document.querySelector('.map__filters');

function deactivatePage() {
  map.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  for (var i = 0; i < formElements.length; i++) {
     console.log(formElements.length);
    formElements[i].setAttribute('disabled', 'disabled');
  }
};

deactivatePage();

function activatePage() {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  for (var i = 0; i < formElements.length; i++) {
    formElements[i].removeAttribute('disabled');
  }
};

var mainPin = document.querySelector('.map__pin--main');
var ENTER_KEYCODE = 13;

// активация страницы
mainPin.addEventListener('mousedown', activatePage);

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activatePage();
  }
});
