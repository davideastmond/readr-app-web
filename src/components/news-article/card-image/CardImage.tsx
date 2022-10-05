import "./style.css";

function CardImage({ src }: { src: string }) {
  return <img alt="article" src={src} className="CardImage" />;
}

export default CardImage;
