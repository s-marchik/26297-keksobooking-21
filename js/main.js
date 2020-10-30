'use strict';

const TITLE = [`title`, `title1`, `title2`];
const PRICE = [10, 20, 30, 40];
const TYPE = [`palace`, `flat`, `house`, `bungalow`];
const TYPE_HOUSE = {palace: `Дворец`, flat: `Квартира`, house: `Дом`, bungalow: `Бунгало`};
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const ROOMS = [1, 2, 3, 4];
const GUESTS = [1, 2, 3, 4];
const CHECKIN = [`12:00`, `13:00`, `14:00`];
const CHECKOUT = [`12:00`, `13:00`, `14:00`];
const DESCRIPTION = [`description`, `description1`, `description2`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];


const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const mapFiltersContainer = document.querySelector(`.map__filters-container`);

const getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const getItemRandom = function (items) {
  const maxIndex = items.length - 1;
  const rndIndex = getRandomInt(0, maxIndex);
  return items[rndIndex];
};

let createRandomArr = function (items) {
  let arr = [];
  let i = 0;

  while (i < items.length) {
    arr[i] = items[getRandomInt(0, items.length)];
    i++;
  }

  return Array.from(new Set(arr));
};

const getAppartmentObject = function () {
  return {
    author: {
      avatar: `img/avatars/user` + 0 + getRandomInt(1, 8) + `.png`
    },
    offer: {
      title: getItemRandom(TITLE),
      address: `location.x location.y`,
      price: getItemRandom(PRICE),
      type: getItemRandom(TYPE),
      rooms: getItemRandom(ROOMS),
      guests: getItemRandom(GUESTS),
      checkin: getItemRandom(CHECKIN),
      checkout: getItemRandom(CHECKOUT),
      features: createRandomArr(FEATURES),
      description: getItemRandom(DESCRIPTION),
      photos: createRandomArr(PHOTOS),
    },
    location: {
      x: getRandomInt(10, 750),
      y: getRandomInt(130, 630),
    }
  };
};

const mapPins = document.querySelector(`.map__pins`);
const countObjectInArray = 8;

const getObjectsArray = function () {
  let objectsArray = [];
  for (let i = 0; i < countObjectInArray; i++) {
    objectsArray.push(getAppartmentObject());
  }
  return objectsArray;
};

const objectsArray = getObjectsArray();

const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);


const pinTemplate = document.querySelector(`#pin`).content.querySelector(`button`);
const fragment = document.createDocumentFragment();

for (let i = 0; i < countObjectInArray; i++) {
  const clonedPin = pinTemplate.cloneNode(true);
  clonedPin.style.left = objectsArray[i].location.x + `px`;
  clonedPin.style.top = objectsArray[i].location.y + `px`;
  const picture = clonedPin.querySelector(`img`);
  picture.src = objectsArray[i].author.avatar;
  picture.alt = objectsArray[i].offer.description;
  fragment.appendChild(clonedPin);
}

mapPins.appendChild(fragment);

let createCard = function (items) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector(`.popup__title`).textContent = objectsArray[items].offer.title;
  cardElement.querySelector(`.popup__text--address`).textContent = objectsArray[items].offer.address;
  cardElement.querySelector(`.popup__text--price`).textContent = `${objectsArray[items].offer.price} ₽/ночь`;
  cardElement.querySelector(`.popup__type`).textContent = TYPE_HOUSE[objectsArray[items].offer.type];
  cardElement.querySelector(`.popup__text--capacity`).textContent = `${objectsArray[items].offer.rooms} комнаты для ${objectsArray[items].offer.guests} гостей`;
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${objectsArray[items].offer.checkin}, выезд до ${objectsArray[items].offer.checkout}`;
  cardElement.querySelector(`.popup__description`).textContent = objectsArray[items].offer.description;
  cardElement.querySelector(`.popup__avatar`).src = objectsArray[items].author.avatar;

  const cardPhotos = cardElement.querySelector(`.popup__photos`);
  const cardPhotoImg = cardPhotos.querySelector(`.popup__photo`);

  for (let i = 0; i < objectsArray[items].offer.photos.length; i++) {
    cardPhotos.appendChild(cardPhotoImg.cloneNode());
  }

  let cardPhotosChildren = cardPhotos.children;
  for (let i = 0; i < cardPhotosChildren.length; i++) {
    cardPhotosChildren[i].src = objectsArray[items].offer.photos[i];
  }

  let cardFeatures = cardElement.querySelector(`.popup__features`).children;
  for (let i = cardFeatures.length - 1; i >= 0; i--) {
    let check = [];
    for (let j = objectsArray[items].offer.features.length - 1; j >= 0; j--) {
      check[j] = cardFeatures[i].classList.contains(`popup__feature--${objectsArray[items].offer.features[j]}`);
    }
    if (!check.includes(true)) {
      cardFeatures[i].remove();
    }
  }
  return cardElement;
};


let extendCard = function (items) {
  const fragmentCard = document.createDocumentFragment();

  fragmentCard.appendChild(createCard(items));
  map.insertBefore(fragmentCard, mapFiltersContainer);
};

extendCard(0);
