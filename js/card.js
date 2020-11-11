'use strict';

(function () {
  const mapFiltersContainer = document.querySelector(`.map__filters-container`);
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const TYPE_HOUSE = {palace: `Дворец`, flat: `Квартира`, house: `Дом`, bungalow: `Бунгало`};
  const map = document.querySelector(`.map`);


  window.card = {
    removeCard: () => {
      const mapCard = document.querySelector(`.map__card`);
      if (mapCard) {
        mapCard.remove();
      }
    },

    collectDataCard: (item) => {
      const cardElement = cardTemplate.cloneNode(true);
      cardElement.querySelector(`.popup__title`).textContent = item.offer.title;
      cardElement.querySelector(`.popup__text--address`).textContent = item.offer.address;
      cardElement.querySelector(`.popup__text--price`).textContent = `${item.offer.price} ₽/ночь`;
      cardElement.querySelector(`.popup__type`).textContent = window.card.getTypeHouse(item.offer.type);
      cardElement.querySelector(`.popup__text--capacity`).textContent = `${item.offer.rooms} комнаты для ${item.offer.guests} гостей`;
      cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`;
      cardElement.querySelector(`.popup__description`).textContent = item.offer.description;
      cardElement.querySelector(`.popup__avatar`).src = item.author.avatar;

      const cardPhotos = cardElement.querySelector(`.popup__photos`);

      const cardPhotoImg = cardPhotos.querySelector(`.popup__photo`);
      cardPhotos.innerHTML = ``;
      for (let i = 0; i < item.offer.photos.length; i++) {
        cardPhotos.appendChild(cardPhotoImg.cloneNode());
      }

      let cardPhotosChildren = cardPhotos.children;
      for (let i = 0; i < cardPhotosChildren.length; i++) {
        cardPhotosChildren[i].src = item.offer.photos[i];
      }

      let cardFeatures = cardElement.querySelector(`.popup__features`).children;
      for (let i = cardFeatures.length - 1; i >= 0; i--) {
        let check = [];
        for (let j = item.offer.features.length - 1; j >= 0; j--) {
          check[j] = cardFeatures[i].classList.contains(`popup__feature--${item.offer.features[j]}`);
        }
        if (!check.includes(true)) {
          cardFeatures[i].remove();
        }
      }
      return cardElement;
    },

    createCard: (item) => {
      const fragmentCard = document.createDocumentFragment();
      fragmentCard.appendChild(window.card.collectDataCard(item));
      map.insertBefore(fragmentCard, mapFiltersContainer);
      const cardCloseBtn = document.querySelector(`.popup__close`);

      cardCloseBtn.addEventListener(`click`, function () {
        window.card.removeCard();
      });

      document.addEventListener(`keydown`, function (evt) {
        if (evt.key === `Escape`) {
          window.card.removeCard();
        }
      });
    },

    getTypeHouse: (type) => {
      return TYPE_HOUSE[type];
    }
  };
})();
