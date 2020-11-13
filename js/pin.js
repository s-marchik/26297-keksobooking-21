'use strict';

(function () {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`button`);
  const mapPins = document.querySelector(`.map__pins`);
  const pinMain = document.querySelector(`.map__pin--main`);
  const fragment = document.createDocumentFragment();

  let showPins = function (objectArray) {
    for (let i = 0; i < objectArray.length; i++) {
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
  };

  let shownPins = 0;
  pinMain.addEventListener(`click`, function () {
    window.card.removeCard();
    window.form.showForm();
    if (!shownPins) {
      window.load(showPins, window.util.errorHandler);
      shownPins = 1;
    }
  });

  pinMain.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      window.card.removeCard();
      window.form.showForm();
      if (!shownPins) {
        window.load(showPins, window.util.errorHandler);
        shownPins = 1;
      }
    }
  });

  pinMain.addEventListener(`mousedown`, function (evt) {
    window.movement.movePinMain(evt);
  });
})();
