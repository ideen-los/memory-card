export default function Card({ id, pairId, image, isVisible, handleClick }) {
  return (
    <div
      className={`card${isVisible ? " visible" : ""}`}
      role="button"
      tabIndex={0}
      data-id={id}
      data-pair-id={pairId}
      onClick={handleClick}
    >
      {image}
    </div>
  );
}
