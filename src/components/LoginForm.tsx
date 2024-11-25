import React, { useState, useContext } from "react";
import "../styles/LoginRegister.scss";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";

interface LoginFormProps {
  onClose: () => void;
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(AuthContext);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        setUser(data.user);
        toast.success("Inicio de sesión exitoso");
        onClose();
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Error al iniciar sesión");
    }
  };
  

  return (
    <form onSubmit={handleLogin}>
      <h2>Iniciar Sesión</h2>
      <div>
        <label>Correo Electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Iniciar Sesión</button>
      <p>
        ¿No tienes cuenta?{" "}
        <span onClick={onSwitchToRegister} >
          Regístrate aquí
        </span>
      </p>
    </form>
  );
};

export default LoginForm;
