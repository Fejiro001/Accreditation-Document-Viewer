import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AuthenticatedLayout from "./layout/AuthenticatedLayout";
// import { AuthProvider } from "./components/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<AuthenticatedLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
