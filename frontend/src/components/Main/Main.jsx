import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import Popup from "./Popup/Popup";
import NewCard from "./Forms/NewCard/NewCard";
import EditProfile from "./Forms/EditProfile/EditProfile";
import EditAvatar from "./Forms/EditAvatar/EditAvatar";
import Card from "./Card/Card";

export default function Main({
  cards,
  popup,
  onOpenPopup,
  onClosePopup,
  onCardLike,
  onCardDelete,
  onAddPlaceSubmit,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const newCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard onAddPlaceSubmit={onAddPlaceSubmit} />,
  };

  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile key={currentUser?._id} />,
  };

  const editAvatarPopup = {
    title: "Actualizar avatar",
    children: <EditAvatar key={currentUser?._id} />,
  };

  return (
    <main className="content">
      <section className="profile page__section">
        <div className="profile__avatar-container">
          <img
            className="profile__image"
            src={currentUser?.avatar}
            alt={currentUser?.name}
          />
          <button
            className="profile__avatar-edit-button"
            type="button"
            onClick={() => onOpenPopup(editAvatarPopup)}
          />
        </div>

        <div className="profile__info">
          <h1 className="profile__title">{currentUser?.name}</h1>
          <button
            className="profile__edit-button"
            type="button"
            onClick={() => onOpenPopup(editProfilePopup)}
          />
          <p className="profile__description">{currentUser?.about}</p>
        </div>

        <button
          className="profile__add-button"
          type="button"
          onClick={() => onOpenPopup(newCardPopup)}
        />
      </section>

      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              handleOpenPopup={onOpenPopup}
            />
          ))}
        </ul>
      </section>

      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
