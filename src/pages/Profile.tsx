import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";

const Profile: React.FC = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    profile_picture: "",
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/"); // Redirigir si no está autenticado
    } else {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        profile_picture: user.profile_picture || "",
      });
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
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
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Apellido</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Foto de perfil</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div>
          <label>Contraseña actual</label>
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
