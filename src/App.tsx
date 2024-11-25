import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";

//Notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => (
  <AuthProvider>
    <AppRoutes />
    <ToastContainer 
      autoClose={2000}/>
  </AuthProvider>
);

export default App;
