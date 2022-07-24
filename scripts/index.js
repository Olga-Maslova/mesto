const popupProfile = document.querySelector('.popup_profile');
const profileEdit = document.querySelector('.profile__info-button');
const buttonClosePopup = document.querySelector('.popup__close_profile');
const infoName = document.querySelector('.profile__info-name');
const infoJob = document.querySelector('.profile__job');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const formElement = document.forms['profileEdit'];

const formAdd = document.querySelector('.popup_card-add');
const formAddOpen = document.querySelector('.profile__add-button');
const formAddClose = document.querySelector('.popup__close_card');
const elements = document.querySelector('.elements');
const formAddCard = document.forms['addCard'];
const cardTemplate = document.querySelector('#card-template');

const imagePopup = document.querySelector('.popup_image');
const imagePopupClose = document.querySelector('.popup__close_image');

const popupImage = document.querySelector('.popup__image');
const popupText = document.querySelector('.popup__figcaption');

const cardName = document.querySelector('.popup__input_type_cardName');
const cardLink = document.querySelector('.popup__input_type_link');

function openPopup(popupWindow) {
    popupWindow.classList.add('popup_open');
};

function closePopup(popupWindow) {
    popupWindow.classList.remove('popup_open');
};

function handlerFormSubmit(evt) {
    evt.preventDefault();
    infoName.textContent = nameInput.value;
    infoJob.textContent = jobInput.value;
    closePopup(popupProfile);
}

function handlerProfile() {
    nameInput.value = infoName.textContent.trim();
    jobInput.value = infoJob.textContent.trim();
};


profileEdit.addEventListener('click', function () {
    handlerProfile();
    openPopup(popupProfile);
});

function createNewCard(item) {
    const element = cardTemplate.content.cloneNode(true);

    const cardText = element.querySelector('.elements__element-text');
    cardText.textContent = item.name;

    const cardImage = element.querySelector('.elements__element-image');
    cardImage.alt = item.name;
    cardImage.src = item.link;

    const cardLike = element.querySelector('.elements__element-button');
    cardLike.addEventListener('click', handlerCardLike);

    const cardDelete = element.querySelector('.elements__element-delete');
    cardDelete.addEventListener('click', handlerCardDelete);


    cardImage.addEventListener('click', function () {

        openPopup(imagePopup);

        popupText.textContent = item.name;
        popupImage.src = item.link;
        popupImage.alt = item.name;

    });

    imagePopupClose.addEventListener('click', () => closePopup(imagePopup));

    return element;

}

function showCards() {
    const card = initialCards.map(function (item) {
        const newCard = createNewCard(item);
        return newCard;
    });

    elements.append(...card);
}

function addNewCard(evt) {
    evt.preventDefault();

    const newCardName = cardName.value;
    const newCardLink = cardLink.value;

    const newCard = createNewCard({ name: newCardName, link: newCardLink });

    elements.prepend(newCard);

    cardName.value = '';
    cardLink.value = '';

    closePopup(formAdd);
}

function handlerCardLike(evt) {
    evt.target.classList.toggle('elements__element-button_active');
}

function handlerCardDelete(evt) {
    evt.target.closest('.elements__element').remove();
}

showCards();

buttonClosePopup.addEventListener('click', () => closePopup(popupProfile));
formElement.addEventListener('submit', handlerFormSubmit);

formAddOpen.addEventListener('click', () => openPopup(formAdd));
formAddClose.addEventListener('click', () => closePopup(formAdd));
formAddCard.addEventListener('submit', addNewCard);