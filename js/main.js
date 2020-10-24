'use strict';

const TITLE = [`title`, `title1`, `title2`];
const PRICE = [10, 20, 30, 40];
const TYPE = [`palace`, `flat`, `house`, `bungalow`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const ROOMS = [1, 2, 3, 4];
const GUESTS = [1, 2, 3, 4];
const CHECKIN = [`12:00`, `13:00`, `14:00`];
const CHECKOUT = [`12:00`, `13:00`, `14:00`];
const DESCRIPTION = [`description`, `description1`, `description2`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];


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
      features: getItemRandom(FEATURES),
      description: getItemRandom(DESCRIPTION),
      photos: getItemRandom(PHOTOS),
    },
    location: {
      x: getRandomInt(10, 750),
      y: getRandomInt(130, 630),
    }
  };
};

const map = document.querySelector(`.map__pins`);
const countObjectInArray = 8;

const getObjectsArray = function () {
  let objectsArray = [];
  for (let i = 0; i < countObjectInArray; i++) {
    objectsArray.push(getAppartmentObject());
  }
  return objectsArray;
};

const objectsArray = getObjectsArray();

const mapToggler = document.querySelector(`.map`);
mapToggler.classList.remove(`map--faded`);

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
map.appendChild(fragment);
