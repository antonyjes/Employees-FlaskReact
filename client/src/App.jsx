import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/auth/Login";
import MainPage from "./pages/main/MainPage";
import CompaniesPage from "./pages/companies/CompaniesPage";
import EmployeesPage from "./pages/employees/EmployeesPage";

function App() {
  const isAuth = Boolean(useSelector((state) => state.token))

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={isAuth ? <MainPage /> : <Navigate to="/" />} />
          <Route path="/companies" element={isAuth ? <CompaniesPage /> : <Navigate to="/" />} />
          <Route path="/employees" element={isAuth ? <EmployeesPage /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
