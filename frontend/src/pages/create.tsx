import "../components/style.css";

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import UploadButton from "../components/button/uploadButton";

const CreateImage: React.FC = () => {
  const API_URL = "http://localhost:5000";

  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [errors, setErrors] = useState({
    file: "",
    description: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLElement>) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      // File validation
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          file: "Only image files are allowed",
        }));
        return;
      }

      setErrors((prev) => ({ ...prev, file: "" }));
      setImage(file);
      setPreview(URL.createObjectURL(file)); //preview Image
    }
  };

  const handleDescription = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    //Description validation
    if (value.trim().length === 0) {
      setErrors((prev) => ({
        ...prev,
        description: "Description is required",
      }));
    } else if (value.length < 3) {
      setErrors((prev) => ({
        ...prev,
        description: "Minium 3 characters required",
      }));
    } else {
      setErrors((prev) => ({ ...prev, description: "" }));
    }
    setDescription(e.target.value);
  };

  const handelCreate = async () => {
    //Final validation before upload
    let valid: boolean = true;

    if (!image) {
      valid = false;
      setErrors((prev) => ({ ...prev, file: "file is required" }));
    }

    if (description.trim().length === 0) {
      setErrors((prev) => ({
        ...prev,
        description: "description is required",
      }));
      valid = false;
    }

    const formData = new FormData();
    formData.append("image", image as File);
    formData.append("description", description);

    if (!valid) return;

    try {
      const result = await axios.post(
        `${API_URL}/api/images/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (result) {
        const { success } = result.data;
        if (success) navigate("/");
      }
    } catch (err) {
      console.error(err);
      alert("upload Failed");
    }
  };

  return (
    <div className="create-card">
      <div className="container">
        <h2 style={{ fontSize: "2.5rem" }}>Create Image</h2>
        <UploadButton onPreview={preview} onFile={handleFileChange} />
        {errors.file && (
          <p style={{ color: "red", margin: "0" }}>{errors.file}</p>
        )}
        <div style={{ padding: "30px" }}>
          <input
            type="text"
            className="card-input"
            placeholder="description"
            value={description}
            onChange={handleDescription}
          />
          {errors.description && (
            <p style={{ color: "red", margin: "0" }}>{errors.description}</p>
          )}
          <div className="btn-group" style={{ marginBottom: "10px" }}>
            <button onClick={handelCreate}>Create</button>
            <button onClick={() => navigate("/")}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateImage;
