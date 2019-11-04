var adverts = [];
var advertsCount = 8;

var map = document.querySelector('.map')

var createAds = function () {

  function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let randoms = min + Math.random() * (max + 1 - min);
    return Math.floor(randoms);
  }

  var horizontalCoord = 0;
  var verticalCoord = 0;

  for (var i = 0; i < advertsCount; i++) {
    var types = ['palace', 'flat', 'house', 'bungalo'];
    var photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
    var features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
    var times = ['12: 00', '13: 00', '14: 00'];

    function createRandomArray(array) {
      var randomArray = []; //финальный массив  offerFeatures
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
    };

    function createCoordinats() {
      horizontalCoord = randomInteger(0, map.offsetWidth);
      verticalCoord = randomInteger(130, 630);
    }
    createCoordinats();

    var ad = {
      "author": {
        "avatar": 'img/avatars/user0' + (i + 1) + '.png'
      },
      "location": {
        "x": horizontalCoord,
        "y": verticalCoord
      },
      "offer": {
        "title": 'Заголовок', //строка, заголовок предложения
        "address": horizontalCoord + ', ' + verticalCoord, // location["y"], // + ',' + location.y, //строка, адрес предложения.Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}" например, "600, 350"
        "price": randomInteger(1000, 63000), //число,стоимость
        "type": types[randomInteger(0, types.length - 1)], //строка с одним из четырёх фиксированных значений: palace, flat,  house или bungalo
        "rooms": randomInteger(1, 10), //число,количество комнат
        "guests": randomInteger(1, 20), //число, количество гостей, которое можно разместить
        "checkin": times[randomInteger(0, times.length - 1)], //строка с одним из трёх фиксированных значений: 12: 00, 13: 00 или 14: 00,
        "checkout": times[randomInteger(0, times.length - 1)], //строка с одним из трёх фиксированных значений: 12: 00, 13: 00 или 14: 00

        "features": createRandomArray(features),
        "description": 'Описание', //строка с описанием,
        "photos": createRandomArray(photos)
      }
    };
    console.log(ad);
    adverts.push(ad);
  }
  console.log(adverts);
  return adverts;
};
createAds();

//временное решение
map.classList.remove('map--faded');
