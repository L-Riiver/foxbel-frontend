import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";

import "../styles/Profile.scss";

const Profile: React.FC = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    profile_picture: "",
    createdAt: "",
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); 
  

  useEffect(() => {
    if (!user) {
      navigate("/"); 
    } else {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        profile_picture: user.profile_picture || "",
        createdAt: user.createdAt,
      });
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImageFile(file);

      // Create image url 
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // save url 
      };
      reader.readAsDataURL(file); // read file
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword) {
      toast.error("Por favor, ingresa tu contraseña actual.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("first_name", formData.first_name);
    formDataToSend.append("last_name", formData.last_name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("currentPassword", currentPassword);

    if (imageFile) {
      formDataToSend.append("profile_picture", imageFile);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/users/update", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user); // context update user data
        toast.success("Perfil actualizado con éxito.");
      } else {
        const error = await response.json();
        toast.error(error.message || "Error al actualizar el perfil.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Ocurrió un error al actualizar el perfil.");
    }
  };

  return (
    <div className="profile">
      <div className="user__info">
        <div className="user__img__container">
          <img
            src={user?.profile_picture || "/img/default-user.png"}
            alt={user?.first_name || "User image"}
            className="user__image"
            title="Editar perfil"
          />
        </div>
        <span className="user__name">
          <h1>{user?.first_name} {user?.last_name ? user?.last_name : ""}</h1>
        </span>
        

        
      </div>
        <span className="user__time">
          Usuario desde: <br /><br /><strong>{user?.createdAt.split("T")[0]}</strong>
        </span>
      <Link className="favorites__url" to={"/favorites"}>Ir a tus favoritos »</Link>
      

      <div className="edit__profile">
        
        <h2>Editar Perfil</h2>
        <form onSubmit={handleSubmit}>
          <div className="input__container">
            <label>Nombre:</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input__container">
            <label>Apellido:</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input__container">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input__container photo">
            <label htmlFor="profile-photo">Foto de perfil:</label>
            {/* preview img */}
            {imagePreview && <img src={imagePreview} alt="Vista previa" className="image-preview" />}
            <input
              id="profile-photo"
              className="button__file"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <label htmlFor="profile-photo" className="update__photo">Seleccionar Foto</label>
          </div>
          <div className="input__container">
            <label>Contraseña actual:<span className="required_symbol" title="Obligatorio">*</span></label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Guardar Cambios</button>
        </form>
        </div>
    </div>
  );
};

export default Profile;
