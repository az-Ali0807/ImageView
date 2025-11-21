import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import UploadButton from "../components/button/uploadButton";

const EditImage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = "http://localhost:5000";

  const [description, setDescription] = useState<string | undefined>("");
  const [url, setUrl] = useState<string>("");
  const [filename, setFilename] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState({
    file: "",
    description: "",
  });

  const { _id } = location.state as { _id: string } 

  useEffect(() => {
    const { description, filename, url } = location.state;

    const setValue = () => {
      setDescription(description);
      setFilename(filename);
      setUrl(`${API_URL}${url}`);
    };
    setValue();
  }, [location.state]);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    //validate description
    if (value.trim().length === 0) {
      setErrors((prev) => ({
        ...prev,
        description: "description is required",
      }));
    } else if (value.length < 3) {
      setErrors((prev) => ({
        ...prev,
        description: "Minium 3 characters are required",
      }));
    } else {
      setErrors((prev) => ({ ...prev, description: "" }));
    }

    setDescription(e.target.value);
  };

  const handleFile = (e: React.ChangeEvent<HTMLElement>) => {
    const file = (e.target as HTMLInputElement).files?.[0];

    if (file) {
      //validate file
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({ ...prev, file: "file must be image" }));
        return;
      }
      setErrors((prev) => ({ ...prev, file: "" }));
      setImage(file);
      setUrl(URL.createObjectURL(file)); //Preview Image URL
    }
  };

  const handleEdit = async () => {
    //final validate
    let isValid = true;

    if (errors.description.trim().length !== 0) {
      setErrors((prev) => ({
        ...prev,
        description: "Description must be required",
      }));
      isValid = false;
    }

    if (!isValid) return;
    try {
      const formData = new FormData();
      formData.append("image", image as File);
      formData.append("description", description as string);
      formData.append("filename", filename as string);
      const result = await axios.put(
        `${API_URL}/api/images/update/${_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      const { success } = result.data;
      if (success) navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="create-card">
      <div className="container">
        <h2 style={{ fontSize: "2.5rem" }}>Edit Image</h2>
        <UploadButton onPreview={url} onFile={handleFile} />
        {errors.file && <p style={{ color: "red" }}>{errors.file}</p>}
        <div style={{ padding: "30px", margin: 0 }}>
          <input
            type="text"
            className="card-input"
            placeholder="description"
            value={description}
            onChange={handleDescriptionChange}
          />
          {errors.description && (
            <p style={{ color: "red", margin: 0, padding: 0 }}>
              {errors.description}
            </p>
          )}
          <div className="btn-group" style={{ marginBottom: "10px" }}>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={() => navigate("/")}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditImage;
