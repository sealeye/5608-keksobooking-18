'use strict';

//Напишите функцию для создания массива из 8 сгенерированных JS объектов. Каждый объект массива ‐ описание похожего объявления неподалёку. Структура объектов должна быть следующей:
//{
//  "author": {
//    "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
//  },
//
//  "offer": {
//    "title": строка, заголовок предложения
//    "address": строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
//    "price": число, стоимость
//    "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
//    "rooms": число, количество комнат
//    "guests": число, количество гостей, которое можно разместить
//    "checkin": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
//    "checkout": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
//    "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
//    "description": строка с описанием,
//    "photos": массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
//  },
//
//  "location": {
//    "x": случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
//    "y": случайное число, координата y метки на карте от 130 до 630.
//  }
//}

//У блока .map уберите класс .map--faded.
//Это временное решение, этот класс переключает карту из неактивного состояния в активное. В последующих заданиях, в соответствии с ТЗ вы будете переключать режимы страницы: неактивный, в котором карта и форма заблокированы и активный режим, в котором производится ввод данных и просмотр похожих объявлений. Сейчас для тестирования функции генерации похожих объявлений мы временно сымитируем активный режим, а в последующих разделах запрограммируем его полностью.

//На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте, и заполните их данными из массива. Итоговую разметку метки .map__pin можно взять из шаблона #pin.
//У метки должны быть следующие данные:
//Координаты:style="left: {{location.x}}px; top: {{location.y}}px;"
//src="{{author.avatar}}"
//alt="{{заголовок объявления}}"
//Обратите внимание. Координаты X и Y, которые вы вставите в разметку, это не координаты левого верхнего угла блока метки, а координаты, на которые указывает метка своим острым концом. Чтобы найти эту координату нужно учесть размеры элемента с меткой.

//Отрисуйте сгенерированные DOM-элементы в блок .map__pins. Для вставки элементов используйте DocumentFragment.
//Требования к коду
//Код должен быть разделён на отдельные функции. Стоит отдельно объявить функцию генерации случайных данных, функцию создания DOM-элемента на основе JS-объекта, функцию заполнения блока DOM-элементами на основе массива JS-объектов. Пункты задания примерно соответствуют функциям, которые вы должны создать.

//Отрисуйте сгенерированные DOM-элементы в блок .map__pins. Для вставки элементов используйте DocumentFragment.

//На основе первого по порядку элемента из сгенерированного массива и шаблона #card создайте DOM-элемент объявления, заполните его данными из объекта:
//Выведите заголовок объявления offer.title в заголовок .popup__title.
//Выведите адрес offer.address в блок .popup__text--address.
//Выведите цену offer.price в блок .popup__text--price строкой вида {{offer.price}}₽/ночь. Например, 5200₽/ночь.
//В блок .popup__type выведите тип жилья offer.type: Квартира для flat, Бунгало для bungalo, Дом для house, Дворец для palace.
//Выведите количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей. Например, 2 комнаты для 3 гостей.
//Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}. Например, заезд после 14:00, выезд до 12:00.
//В список .popup__features выведите все доступные удобства в объявлении.
//В блок .popup__description выведите описание объекта недвижимости offer.description.
//В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как src соответствующего изображения.
//Замените src у аватарки пользователя — изображения, которое записано в .popup__avatar — на значения поля author.avatar отрисовываемого объекта.

//Вставьте полученный DOM-элемент в блок .map перед блоком.map__filters-container.

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
function typeProperty() {
  var typeIndex = randomInteger(0, types.length - 1);
  var obj = types[typeIndex];

  return Object.keys(obj)[0];
};

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

  // создание координат метки
  function createCoordinats() {
    horizontalCoord = randomInteger(pinWidth, map.offsetWidth);
    verticalCoord = randomInteger(130, 630);
  }

  for (var i = 0; i < advertsCount; i++) {
    createCoordinats();

    var type = typeProperty();

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

// временное решение
map.classList.remove('map--faded');

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

  card.querySelector('.popup__type').textContent = typeText; //todo настроить
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
    console.log(ad.offer.photos);
    photo.src = ad.offer.photos[i];
    card.querySelector('.popup__photos').appendChild(photo);
  }

  card.querySelector('.popup__photos img:first-child').remove(); // удаляет пример фото из темплейта
  card.querySelector('.popup__avatar').src = ad.author.avatar;

  console.log(card);
  return card;
}

function renderCard() {
  var pinsList = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  fragment.appendChild(createCard(adverts[0]));

  pinsList.after(fragment);
}
renderCard();


console.log(adverts[0]);
