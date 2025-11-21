import "../components/style.css";

import LazyImage from "./LazyImage";

import type { ImageCardProps } from "../types";

const ImageCard = ({ url, description, onEdit, onDelete }: ImageCardProps) => {
  return (
    <div className="image-card">
      <div className="card-container">
        <LazyImage src={url} alt="image" className="card-image" />
        <p style={{ padding: "0px 10px" }}>{description}</p>
        <div className="btn-group">
          <button style={{ marginRight: "5px" }} onClick={onEdit}>
            Edit
          </button>
          <button onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
