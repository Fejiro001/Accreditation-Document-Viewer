import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import DriveFiles from "./pages/DriveFiles";
import Users from "./pages/Users";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<DriveFiles />} />
          <Route path="/folder/:folderId" element={<DriveFiles />} />
          <Route path="/admin/users" element={<Users />} />
        </Routes>
      </Router>
  );
}

export default App;
