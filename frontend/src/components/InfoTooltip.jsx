import successIcon from "../images/Union.png";

export default function InfoTooltip({ isOpen, isSuccess, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="tooltip">
      <div className="tooltip__container">
        {isSuccess && (
          <img src={successIcon} alt="Success" className="tooltip__icon" />
        )}

        <h2 className="tooltip__text">
          {isSuccess
            ? "¡Correcto! Ya estás registrado."
            : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
        </h2>

        <button className="tooltip__close" onClick={onClose}></button>
      </div>
    </div>
  );
}
