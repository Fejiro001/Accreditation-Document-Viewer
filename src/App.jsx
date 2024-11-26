import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import DriveFiles from "./pages/DriveFiles";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<DriveFiles />} />
        <Route path="/folder/:folderId" element={<DriveFiles />} />
      </Routes>
    </Router>
  );
}

export default App;
