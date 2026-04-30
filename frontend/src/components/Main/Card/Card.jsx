import { useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

export default function Card({
  card,
  onCardLike,
  onCardDelete,
  handleOpenPopup,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const { name, link, likes = [], owner } = card;

  const isLiked = likes.some((like) => {
    const likeId = typeof like === "string" ? like : like._id;
    return likeId === currentUser._id;
  });
  const ownerId = typeof owner === "string" ? owner : owner?._id;
  const isOwn = ownerId === currentUser._id;

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_is-active" : ""
  }`;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() =>
          handleOpenPopup({
            title: null,
            children: (
              <>
                <img className="popup__image" src={link} alt={name} />
                <p className="popup__caption">{name}</p>
              </>
            ),
          })
        }
      />

      {isOwn && (
        <button
          aria-label="Delete card"
          className="card__delete-button"
          type="button"
          onClick={handleDeleteClick}
        />
      )}

      <div className="card__description">
        <h2 className="card__title">{name}</h2>

        <button
          aria-label="Like card"
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        />
      </div>
    </li>
  );
}
