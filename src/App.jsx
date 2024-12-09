import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import DriveFiles from "./pages/DriveFiles";
import Users from "./pages/Users";
import EditUser from "./pages/EditUser";
import AddUser from "./pages/AddUser";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<DriveFiles />} />
          <Route path="/folder/:folderId" element={<DriveFiles />} />
          {/* Admin Routes */}
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/users/add" element={<AddUser />} />
          <Route path="/admin/users/:id/edit" element={<EditUser />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
