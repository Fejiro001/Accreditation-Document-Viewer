// import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import DriveFiles from "../pages/DriveFiles";
// import axios from "axios";

function AuthenticatedLayout() {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   axios
  //     .get("/api/user")
  //     .then((response) => setUser(response.data.name))
  //     .catch((error) => console.error("Error fetching user data: ", error));

  //   console.log("User: ", user);
  // }, []);
  return (
    <div className="flex flex-col min-h-screen items-center bg-slate-100 dark:bg-black">
      <NavBar />
      <DriveFiles />
    </div>
  );
}

export default AuthenticatedLayout;
