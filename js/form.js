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

  const MAP_PIN_WIDTH = 65;
  const MAP_PIN_HEIGHT = 84;

  const map = document.querySelector(`.map`);
  const mapFilters = document.querySelector(`.map__filters`);
  const pinMain = document.querySelector(`.map__pin--main`);
  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const main = document.querySelector(`main`);
  const resetBtn = document.querySelector(`.ad-form__reset`);

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

  let priceMinToTypeMatch = function (i) {
    priceInput.min = priceInput.placeholder = priceMinToType[i];
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

  let resetPrice = function () {
    priceMinToTypeMatch(`flat`);
  };


  typeInput.addEventListener(`change`, (event) => {
    priceMinToTypeMatch(event.target.value);
  });
  timeInInput.addEventListener(`change`, timesInMatch);
  timeOutInput.addEventListener(`change`, timesOutMatch);
  titleInput.addEventListener(`input`, validateTitle);
  priceInput.addEventListener(`input`, validatePrice);
  roomsInput.addEventListener(`input`, roomsAndCapacityMatch);
  capacityInput.addEventListener(`input`, roomsAndCapacityMatch);

  const hideSuccessMessage = (evt) => {
    evt.preventDefault();
    const message = main.querySelector(`.success`);
    main.removeChild(message);
    document.removeEventListener(`click`, hideSuccessMessage);
    document.removeEventListener(`keydown`, hideSuccessMessageByEsc);
  };

  const hideSuccessMessageByEsc = (evt) => {
    if (evt.key === `Escape`) {
      hideSuccessMessage(evt);
    }
  };

  const setSuccessMessage = () => {
    const successMessage = successTemplate.cloneNode(true);
    main.appendChild(successMessage);

    document.addEventListener(`click`, hideSuccessMessage);
    document.addEventListener(`keydown`, hideSuccessMessageByEsc);
    window.form.setDefForm();
    window.pin.setDefPin();
  };

  const hideErrorMessage = (evt) => {
    evt.preventDefault();
    const message = main.querySelector(`.error`);
    main.removeChild(message);
    document.removeEventListener(`click`, hideErrorMessage);
    document.removeEventListener(`keydown`, hideErrorMessageByEsc);
  };

  const hideErrorMessageByEsc = (evt) => {
    if (evt.key === `Escape`) {
      hideErrorMessage(evt);
    }
  };

  const setErrorMessage = () => {
    const errorMessage = errorTemplate.cloneNode(true);
    main.appendChild(errorMessage);
    document.addEventListener(`click`, hideErrorMessage);
    document.addEventListener(`keydown`, hideErrorMessageByEsc);
    const btnErr = document.querySelector(`.error__button`);
    btnErr.addEventListener(`click`, hideErrorMessage);
  };

  adForm.addEventListener(`submit`, (evt) => {
    window.upload(new FormData(adForm), () => {

      window.pin.removePins();
      window.card.removeCard();
      adForm.reset();
      resetPrice();
      window.pin.resetPinMain();

      setSuccessMessage();
    }, setErrorMessage);
    evt.preventDefault();
  });

  resetBtn.addEventListener(`click`, () => {
    adForm.reset();
    resetPrice();
    window.pin.resetPinMain();
  });

  window.form = {
    showForm: () => {
      map.classList.remove(`map--faded`);
      adForm.classList.remove(`ad-form--disabled`);
      window.form.getAddressFromPinPosition(pinMain.offsetLeft, pinMain.offsetTop);

      changeValue(adForm, true);
      changeValue(mapFilters, true);
    },

    mainPinPosLeft: (x) => {
      return parseInt(parseInt(x, 10) + MAP_PIN_WIDTH / 2, 10);
    },

    mainPinPosTop: (y) => {
      return parseInt(parseInt(y, 10) + MAP_PIN_HEIGHT, 10);
    },

    getAddressFromPinPosition: (xPinPoint, yPinPoint) => {
      adressInput.value = `${window.form.mainPinPosLeft(xPinPoint)}, ${window.form.mainPinPosTop(yPinPoint)}`;
    },

    setDefForm: () => {
      map.classList.add(`map--faded`);
      adForm.classList.add(`ad-form--disabled`);
      changeValue(adForm, false);
      changeValue(mapFilters, false);
    }
  };

})();

