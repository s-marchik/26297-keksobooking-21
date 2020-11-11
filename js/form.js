'use strict';

(function () {
  const adForm = document.querySelector(`.ad-form`);
  const adressInput = adForm.querySelector(`input[name=address]`);
  const titleInput = adForm.querySelector(`input[name=title]`);
  const priceInput = adForm.querySelector(`input[name=price]`);
  const typeInput = adForm.querySelector(`select[name=type]`);
  const timeInInput = adForm.querySelector(`select[name=timein]`);
  const timeOutInput = adForm.querySelector(`select[name=timeout]`);
  const roomsInput = adForm.querySelector(`select[name=rooms]`);
  const capacityInput = adForm.querySelector(`select[name=capacity]`);
  const priceMinToType = {bungalow: 0, flat: 1000, house: 5000, palace: 10000};
  const map = document.querySelector(`.map`);
  const mapFilters = document.querySelector(`.map__filters`);
  const MAP_PIN_WIDTH = 65;
  const MAP_PIN_HEIGHT = 84;

  const pinMain = document.querySelector(`.map__pin--main`);

  window.form = {
    showForm: () => {
      map.classList.remove(`map--faded`);
      adForm.classList.remove(`ad-form--disabled`);

      changeValue(adForm, true);
      changeValue(mapFilters, true);
    },

    getAddressFromPinPosition: (xPinPoint, yPinPoint) => {
      adressInput.value = `${parseInt(parseInt(xPinPoint, 10) + MAP_PIN_WIDTH / 2, 10)}, ${parseInt(parseInt(yPinPoint, 10) + MAP_PIN_HEIGHT, 10)}`;
    }
  };

  let changeValue = function (form, ability) {
    const fieldsets = form.querySelectorAll(`fieldset`);
    const selects = form.querySelectorAll(`select`);

    for (let fieldset of fieldsets) {
      fieldset.disabled = !ability;
    }

    for (let select of selects) {
      select.disabled = !ability;
    }
  };

  changeValue(adForm, false);
  changeValue(mapFilters, false);

  let priceMinToTypeMatch = function () {
    priceInput.min = priceInput.placeholder = priceMinToType[typeInput.value];
  };

  let timesOutMatch = function () {
    timeInInput.value = timeOutInput.value;
  };

  let timesInMatch = function () {
    timeOutInput.value = timeInInput.value;
  };

  let validatePrice = function () {
    if (+priceInput.value < priceInput.min) {
      priceInput.setCustomValidity(`Цена меньше минимальной`);
    } else if (+priceInput.value > priceInput.max) {
      priceInput.setCustomValidity(`Цена больше минимальной`);
    } else {
      priceInput.setCustomValidity(``);
    }

    priceInput.reportValidity();
  };

  let validateTitle = function () {
    if (titleInput.value.length < titleInput.minLength) {
      titleInput.setCustomValidity(`Заголовок должен быть из ${titleInput.minLength} символов`);
    } else if (titleInput.value.length > titleInput.maxLength) {
      titleInput.setCustomValidity(`Заголовок не должен быть больше ${titleInput.maxLength} символов`);
    } else {
      titleInput.setCustomValidity(``);
    }
    titleInput.reportValidity();
  };

  let roomsAndCapacityMatch = function () {
    if (+capacityInput.value === 0 && +roomsInput.value !== 100 || +capacityInput.value !== 0 && +roomsInput.value === 100) {
      roomsInput.setCustomValidity(`Неправильное значение`);
      capacityInput.setCustomValidity(`Неправильное значение`);
    } else if (+capacityInput.value > roomsInput.value) {
      roomsInput.setCustomValidity(`Неправильное значение`);
      capacityInput.setCustomValidity(`Неправильное значение`);
    } else {
      roomsInput.setCustomValidity(``);
      capacityInput.setCustomValidity(``);
    }

    roomsInput.reportValidity();
    capacityInput.reportValidity();
  };

  window.form.getAddressFromPinPosition(pinMain.offsetLeft, pinMain.offsetTop);
  typeInput.addEventListener(`change`, priceMinToTypeMatch);
  timeInInput.addEventListener(`change`, timesInMatch);
  timeOutInput.addEventListener(`change`, timesOutMatch);
  titleInput.addEventListener(`input`, validateTitle);
  priceInput.addEventListener(`input`, validatePrice);
  roomsInput.addEventListener(`input`, roomsAndCapacityMatch);
  capacityInput.addEventListener(`input`, roomsAndCapacityMatch);

})();

