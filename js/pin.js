'use strict';

(function () {
  const MAP_PIN_MAIN_DEF_POS_X = 570;
  const MAP_PIN_MAIN_DEF_POS_Y = 375;
  const SHOW_PIN_COUNT = 5;

  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`button`);
  const mapPins = document.querySelector(`.map__pins`);
  const pinMain = document.querySelector(`.map__pin--main`);
  const fragment = document.createDocumentFragment();
  const map = document.querySelector(`.map`);

  let loadedPins;
  let isShownPins = 0;

  pinMain.addEventListener(`click`, function () {
    window.card.removeCard();
    window.form.showForm();
    if (!isShownPins) {
      window.pin.loadPins();
      pinMain.addEventListener(`mousedown`, window.movement.movePinMain);
    }
  });

  pinMain.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      window.card.removeCard();
      window.form.showForm();
      if (!isShownPins) {
        window.pin.loadPins();
        pinMain.addEventListener(`mousedown`, window.movement.movePinMain);
      }
    }
  });

  window.pin = {
    loadedPins,

    removePins: () => {
      const pins = document.querySelectorAll(`.map__pin`);
      pins.forEach(function (item) {
        if (!item.matches(`.map__pin--main`)) {
          item.remove();
        }
      });
    },

    resetPinMain: () => {
      pinMain.style.left = `${MAP_PIN_MAIN_DEF_POS_X}px`;
      pinMain.style.top = `${MAP_PIN_MAIN_DEF_POS_Y}px`;
      pinMain.removeEventListener(`mousedown`, window.movement.movePinMain);
      window.pin.removePins();
      window.card.removeCard();
      map.classList.add(`map--faded`);
      isShownPins = 0;
    },

    showPins: (objectArray) => {
      for (let i = 0; i < Math.min(objectArray.length, SHOW_PIN_COUNT); i++) {
        const clonedPin = pinTemplate.cloneNode(true);
        clonedPin.style.left = objectArray[i].location.x + `px`;
        clonedPin.style.top = objectArray[i].location.y + `px`;
        const picture = clonedPin.querySelector(`img`);
        picture.src = objectArray[i].author.avatar;
        picture.alt = objectArray[i].offer.description;
        clonedPin.addEventListener(`click`, function () {
          window.card.removeCard();
          window.card.createCard(objectArray[i]);
        });
        clonedPin.addEventListener(`keydown`, function (evt) {
          if (evt.key === `Enter`) {
            window.card.removeCard();
            window.card.createCard(objectArray[i]);
          }
        });
        fragment.appendChild(clonedPin);
      }
      mapPins.appendChild(fragment);
    },

    loadPins: () => {
      window.load.getData(window.pin.showPins, window.util.errorHandler);
      isShownPins = 1;
    }
  };
})();
