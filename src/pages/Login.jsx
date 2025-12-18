import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { encriptarDato } from '../utils/crypto';
import '../styles/Registro.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const datosLogin = {
        email: formData.email,
        password: encriptarDato(formData.password)
      };

      // CAMBIO CLAVE: Usamos la URL de Render en lugar de localhost
      const res = await axios.post('https://edunet-server.onrender.com/api/auth/login', datosLogin);
      
      localStorage.setItem('usuarioId', res.data.usuarioId);
      localStorage.setItem('nombre', res.data.nombre);
      
      alert("¡Bienvenido!");
      navigate('/explorar');
    } catch (err) {
      console.error(err);
      alert("Error: Credenciales incorrectas o el servidor no responde.");
    }
  };

  return (
    <div className="registro-container">
      <form className="registro-box" onSubmit={handleSubmit}>
        <h2>🚀 Iniciar Sesión</h2>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
        <button type="submit" className="btn-registro">Entrar</button>
      </form>
    </div>
  );
};

export default Login;