import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ImageCard from "../components/ImageCard";

import type { ImageItem } from "../types";

import "../components/style.css";

const ImageList: React.FC = () => {
  const API_URL = "http://localhost:5000";
  const navigate = useNavigate();

  const [list, setList] = useState<ImageItem[]>([]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const result = await axios.get(`${API_URL}/api/images/get`);
        const { data } = result.data;
        setList(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchImage();
  }, []);

  const handleEdit = (image: ImageItem) => {
    navigate("/image/edit", { state: image });
  };

  const handelDelete = async (id: string) => {
    try {
      const result = await axios.delete(`${API_URL}/api/images/delete/${id}`);
      const { success } = result.data;
      if (success) {
        setList((prev) => prev.filter((item) => item._id !== id));
        alert("success!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="image-list">
        {list &&
          list.map((image: ImageItem) => (
            <ImageCard
              key={image._id}
              url={`${API_URL}${image.url}`}
              description={image.description}
              onEdit={() => handleEdit(image)}
              onDelete={() => handelDelete(image._id)}
            />
          ))}
      </div>
    </div>
  );
};

export default ImageList;
