import { useState } from "react";

export default function NewCard({ onAddPlaceSubmit }) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlaceSubmit({
      name: title,
      link: link,
    });

    setTitle("");
    setLink("");
  }

  return (
    <form className="popup__form" onSubmit={handleSubmit} noValidate>
      <label className="popup__field">
        <input
          className="popup__input"
          type="text"
          placeholder="Título"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <label className="popup__field">
        <input
          className="popup__input"
          type="url"
          placeholder="Enlace a la imagen"
          required
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </label>

      <button className="button popup__button" type="submit">
        Crear
      </button>
    </form>
  );
}
