const popupProfile = document.querySelector('.popup_profile');
const profileEditButton = document.querySelector('.profile__info-button');
const buttonClosePopup = document.querySelector('.popup__close_profile');
const infoName = document.querySelector('.profile__info-name');
const infoJob = document.querySelector('.profile__job');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const profileformElement = document.forms['profileEdit'];

const popupCardAdd = document.querySelector('.popup_card-add');
const popupCardAddOpenButton = document.querySelector('.profile__add-button');
const popupCardAddCloseButton = document.querySelector('.popup__close_card');
const cardsContainer = document.querySelector('.elements');
const cardFormElement = document.forms['addCard'];
const cardTemplate = document.querySelector('#card-template');

const imagePopup = document.querySelector('.popup_image');
const imagePopupCloseButton = document.querySelector('.popup__close_image');

const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__figcaption');

const cardName = document.querySelector('.popup__input_type_cardName');
const cardLink = document.querySelector('.popup__input_type_cardUrl');

const submitCardButton = popupCardAdd.querySelector('.popup__submit-button');

function openPopup(popupWindow) {
    popupWindow.classList.add('popup_open');
    document.addEventListener('keydown', handleEscKeyDown);
};

function closePopup(popupWindow) {
    popupWindow.classList.remove('popup_open');
    document.removeEventListener('keydown', handleEscKeyDown);
};
function handlePopupOverlayClick(evt) {
    if (evt.target.classList.contains('popup_open')) {
        closePopup(evt.target);
    };
};

function handleEscKeyDown(evt) {
    if (evt.key === 'Escape') {
        const windowOpen = document.querySelector('.popup_open');
        closePopup(windowOpen);
    };
};

const disableAddFormSubmitButton = () => {
    submitCardButton.classList.add('popup__submit-button_disabled');
    submitCardButton.disabled = true;
};

popupCardAddOpenButton.addEventListener('click', () => {
    disableAddFormSubmitButton();
    cardFormElement.reset();
    openPopup(popupCardAdd);
});

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    infoName.textContent = nameInput.value;
    infoJob.textContent = jobInput.value;
    closePopup(popupProfile);
}

function handleProfile() {
    nameInput.value = infoName.textContent;
    jobInput.value = infoJob.textContent;
};

profileEditButton.addEventListener('click', function () {
    handleProfile();
    openPopup(popupProfile);
});

function createNewCard(cards) {
    const card = cardTemplate.content.cloneNode(true);

    const cardText = card.querySelector('.elements__element-text');
    cardText.textContent = cards.name;

    const cardImage = card.querySelector('.elements__element-image');
    cardImage.alt = cards.name;
    cardImage.src = cards.link;

    const likeButton = card.querySelector('.elements__element-button');
    likeButton.addEventListener("click", () => {
        likeButton.classList.toggle('elements__element-button_active');
    });

    const cardDelete = card.querySelector('.elements__element-delete');
    cardDelete.addEventListener('click', handleCardDelete);


    cardImage.addEventListener('click', function () {
        popupImageCaption.textContent = cards.name;
        popupImage.src = cards.link;
        popupImage.alt = cards.name;

        openPopup(imagePopup);
    });

    return card;

}

function showCards() {
    const cardList = initialCards.map(function (cards) {
        const newCard = createNewCard(cards);
        return newCard;
    });

    cardsContainer.append(...cardList);
}

function handleNewCard(evt) {
    evt.preventDefault();

    const newCardName = cardName.value;
    const newCardLink = cardLink.value;

    const newCard = createNewCard({ name: newCardName, link: newCardLink });

    cardsContainer.prepend(newCard);

    cardName.value = '';
    cardLink.value = '';

    closePopup(popupCardAdd);
    disableAddFormSubmitButton();
}

function handleCardDelete(evt) {
    evt.target.closest('.elements__element').remove();
}

showCards();

buttonClosePopup.addEventListener('click', () => closePopup(popupProfile));
profileformElement.addEventListener('submit', handleProfileFormSubmit);

popupCardAddOpenButton.addEventListener('click', () => openPopup(popupCardAdd));
popupCardAddCloseButton.addEventListener('click', () => closePopup(popupCardAdd));
cardFormElement.addEventListener('submit', handleNewCard);

imagePopupCloseButton.addEventListener('click', () => closePopup(imagePopup));

popupProfile.addEventListener('click', handlePopupOverlayClick);
popupCardAdd.addEventListener('click', handlePopupOverlayClick);
imagePopup.addEventListener('click', handlePopupOverlayClick);