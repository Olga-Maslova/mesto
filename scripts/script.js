let popup = document.querySelector('.popup');
let EditProfile = document.querySelector('.profile__info-button');
let ClosePopup = document.querySelector('.popup__close');
let Name = document.querySelector('.profile__info-name');
let Job = document.querySelector('.profile__job');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let formElement = document.forms['profileEdit'];

function popupOpen() {
    popup.classList.add('popup__container_open');
    nameInput.value = Name.textContent.trim();
    jobInput.value = Job.textContent.trim();
}

function popupClose() {
    popup.classList.remove('popup__container_open');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    Name.textContent = nameInput.value;
    Job.textContent = jobInput.value;
    popupClose();
}

EditProfile.addEventListener('click', popupOpen);
ClosePopup.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler);