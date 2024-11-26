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
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Para mostrar la miniatura de la imagen

  useEffect(() => {
    if (!user) {
      navigate("/"); // Redirigir si no está autenticado
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

      // Crear una URL para la imagen seleccionada y mostrarla en miniatura
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Guardar la URL de la imagen en el estado
      };
      reader.readAsDataURL(file); // Leer el archivo como una URL
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
        setUser(data.user); // Actualizar el contexto
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
      <h1>Mi Perfil</h1>
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
          Bienvenido a tu perfil, <br /> {user?.first_name} {user?.last_name ? user?.last_name : ""}<br /><br />
        </span>
        <span className="user__time">
          Usuario desde <br />{user?.createdAt.split("T")[0]}
        </span>
        <br />
        

        <Link className="favorites__url" to={"/favorites"}>Ver tus favoritos...</Link>
        
      </div>
      

      
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
        <div className="input__container">
          <label>Foto de perfil:</label>
          {imagePreview && <img src={imagePreview} alt="Vista previa" className="image-preview" />}
          <input type="file" onChange={handleFileChange} />
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
  );
};

export default Profile;
