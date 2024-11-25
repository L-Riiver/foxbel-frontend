import React, { useState, useContext } from "react";
import "../styles/LoginRegister.scss";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";

interface RegisterFormProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    gender: "",
    email: "",
    password: "",
  });

  const { setUser } = useContext(AuthContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const response = await fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      setUser(data.user); // Actualiza el contexto
      toast.success("Usuario registrado con éxito");
      onClose();
    } else {
      const errorData = await response.json();
      toast.error(errorData.error || "Error al registrarse");
    }
  } catch (error) {
    console.error("Error registering user:", error);
    toast.error("Error al registrar el usuario");
  }
};

  return (
    <form onSubmit={handleRegister}>
      <h2>Regístrate</h2>
      <div>
        <label>Nombre: <span className="required" title="Obligatorio">*</span></label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Apellido: <span className="required" title="Obligatorio">*</span></label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Teléfono:</label>
        <input
          type="tel"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Género:</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Selecciona</option>
          <option value="male">Masculino</option>
          <option value="female">Femenino</option>
          <option value="other">Otro</option>
        </select>
      </div>
      <div>
        <label>Correo Electrónico: <span className="required" title="Obligatorio">*</span></label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Contraseña: <span className="required" title="Obligatorio">*</span></label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Registrarse</button>
      <p>
        ¿Ya tienes cuenta?{" "}
        <span onClick={onSwitchToLogin}>
          Iniciar sesión 
        </span>
      </p>
    </form>
  );
};

export default RegisterForm;
