import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import DriveFiles from "./pages/DriveFiles";
import Users from "./pages/Users";
import UserDetails from "./pages/UserDetails";
import AddUser from "./pages/AddUser";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<DriveFiles />} />
        <Route path="/folder/:folderId" element={<DriveFiles />} />
        {/* Admin Routes */}
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/users/add" element={<AddUser />} />
        <Route path="/admin/userDetails" element={<UserDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
