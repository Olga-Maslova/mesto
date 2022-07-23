const popup = document.querySelector('.popup');
const editProfile = document.querySelector('.profile__info-button');
const closePopup = document.querySelector('.popup__close_profile');
const infoName = document.querySelector('.profile__info-name');
const infoJob = document.querySelector('.profile__job');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const formElement = document.forms['profileEdit'];

const addForm = document.querySelector('.popup_card-add');
const openAddForm = document.querySelector('.profile__add-button');
const closeAddForm = document.querySelector('.popup__close_card');
const elements = document.querySelector('.elements');
const formAddCard = document.forms['addCard'];
const cardTemplate = document.querySelector('#card-template');

const imagePopup = document.querySelector('.popup_image');
const closeImagePopup = document.querySelector('.popup__close_image');


function popupOpen() {
    popup.classList.add('popup_open');
    nameInput.value = infoName.textContent.trim();
    jobInput.value = infoJob.textContent.trim();
}

function popupClose() {
    popup.classList.remove('popup_open');
}

function addFormOpen() {
    addForm.classList.add('popup_open');
}

function addFormClose() {
    addForm.classList.remove('popup_open');
}

function imagePopupOpen() {
    imagePopup.classList.add('popup_open');
}

function imagePopupClose() {
    imagePopup.classList.remove('popup_open');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    infoName.textContent = nameInput.value;
    infoJob.textContent = jobInput.value;
    popupClose();
}

function createNewCard(item) {
    const element = cardTemplate.content.cloneNode(true);

    const cardText = element.querySelector('.elements__element-text');
    cardText.textContent = item.name;

    const cardImage = element.querySelector('.elements__element-image');
    cardImage.alt = item.name;
    cardImage.src = item.link;

    cardImage.addEventListener('click', function () {

        imagePopupOpen();

        const popupText = document.querySelector('.popup__figcaption');
        popupText.textContent = item.name;

        const popupImage = document.querySelector('.popup__image');
        popupImage.src = item.link;
        popupImage.alt = item.name;

    });

    closeImagePopup.addEventListener('click', imagePopupClose);

    return element;

};

function showCards() {
    const card = initialCards.map(function (item) {
        const newCard = createNewCard(item);
        cardsAction(newCard);
        return newCard;
    });

    elements.append(...card);
}

function addNewCard(evt) {
    evt.preventDefault();

    const cardName = document.querySelector('.popup__input_type_cardName');
    const cardLink = document.querySelector('.popup__input_type_link');

    const newCardName = cardName.value;
    const newCardLink = cardLink.value;

    const newCard = createNewCard({ name: newCardName, link: newCardLink });

    cardsAction(newCard);
    elements.prepend(newCard);

    cardName.value = '';
    cardLink.value = '';

    addFormClose();
}

function cardLikeHandler(evt) {
    evt.target.classList.toggle('elements__element-button_active');
}

function cardDeleteHandler(evt) {
    evt.target.closest('.elements__element').remove();
}

function cardsAction(element) {

    const cardLike = element.querySelector('.elements__element-button');
    cardLike.addEventListener('click', cardLikeHandler);

    const cardDelete = element.querySelector('.elements__element-delete');
    cardDelete.addEventListener('click', cardDeleteHandler)
}
showCards();

editProfile.addEventListener('click', popupOpen);
closePopup.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler);

openAddForm.addEventListener('click', addFormOpen);
closeAddForm.addEventListener('click', addFormClose);
formAddCard.addEventListener('submit', addNewCard);