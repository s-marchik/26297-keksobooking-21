'use strict';

(function () {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`button`);
  const mapPins = document.querySelector(`.map__pins`);
  const pinMain = document.querySelector(`.map__pin--main`);
  const fragment = document.createDocumentFragment();
  const countObjectInArray = 8;

  const objectsArray = window.data.getObjectsArray(countObjectInArray);

  let drowPins = function () {
    for (let i = 0; i < objectsArray.length; i++) {
      const clonedPin = pinTemplate.cloneNode(true);
      clonedPin.style.left = objectsArray[i].location.x + `px`;
      clonedPin.style.top = objectsArray[i].location.y + `px`;
      const picture = clonedPin.querySelector(`img`);
      picture.src = objectsArray[i].author.avatar;
      picture.alt = objectsArray[i].offer.description;
      fragment.appendChild(clonedPin);
    }
  };

  drowPins();

  let showPins = function () {
    mapPins.appendChild(fragment);
    const mapPinsArray = document.querySelectorAll(`.map__pin`);

    for (let i = 1; i <= mapPinsArray.length - 1; i++) {
      mapPinsArray[i].addEventListener(`click`, function () {
        window.card.removeCard();
        window.card.createCard(objectsArray[i - 1]);
      });

      mapPinsArray[i].addEventListener(`keydown`, function (evt) {
        if (evt.key === `Enter`) {
          window.card.removeCard();
          window.card.createCard(objectsArray[i - 1]);
        }
      });
    }
  };

  let shownPins = 0;
  pinMain.addEventListener(`click`, function () {
    window.card.removeCard();
    window.form.showForm();
    if (!shownPins) {
      showPins();
      shownPins = 1;
    }
  });

  pinMain.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      window.card.removeCard();
      window.form.showForm();
      if (!shownPins) {
        showPins();
        shownPins = 1;
      }
    }
  });
})();
