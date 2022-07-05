let popup = document.querySelector('.popup');
let editProfile = document.querySelector('.profile__info-button');
let closePopup = document.querySelector('.popup__close');
let infoName = document.querySelector('.profile__info-name');
let infoJob = document.querySelector('.profile__job');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let formElement = document.forms['profileEdit'];

function popupOpen() {
    popup.classList.add('popup_open');
    nameInput.value = infoName.textContent.trim();
    jobInput.value = infoJob.textContent.trim();
}

function popupClose() {
    popup.classList.remove('popup_open');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    infoName.textContent = nameInput.value;
    infoJob.textContent = jobInput.value;
    popupClose();
}

popup.classList.remove('popup_open');
editProfile.addEventListener('click', popupOpen);
closePopup.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler);