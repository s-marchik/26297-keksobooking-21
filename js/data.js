'use strict';

(function () {
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

  const getAppartmentObject = function () {
    return {
      author: {
        avatar: `img/avatars/user` + 0 + window.util.getRandomInt(1, 8) + `.png`
      },
      offer: {
        title: window.util.getItemRandom(TITLE),
        address: `location.x location.y`,
        price: window.util.getItemRandom(PRICE),
        type: window.util.getItemRandom(TYPE),
        rooms: window.util.getItemRandom(ROOMS),
        guests: window.util.getItemRandom(GUESTS),
        checkin: window.util.getItemRandom(CHECKIN),
        checkout: window.util.getItemRandom(CHECKOUT),
        features: window.util.createRandomArr(FEATURES),
        description: window.util.getItemRandom(DESCRIPTION),
        photos: window.util.createRandomArr(PHOTOS),
      },
      location: {
        x: window.util.getRandomInt(10, 750),
        y: window.util.getRandomInt(130, 630),
      }
    };
  };
  window.data = {
    getObjectsArray: (n) => {
      let objArray = [];
      for (let i = 0; i < n; i++) {
        objArray.push(getAppartmentObject());
      }
      return objArray;
    },
    getTypeHouse: (type) => {
      return TYPE_HOUSE[type];
    }
  };

})();
