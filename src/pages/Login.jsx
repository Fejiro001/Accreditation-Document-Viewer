import { useState } from "react";
import { useLocation } from "react-router-dom";

function Login() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const message = location.state?.message;

  /**
   * Handles the Google login process by fetching the authentication URL
   * from the API and redirecting the user to it.
   */
  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      window.location.href = `${import.meta.env.VITE_API_URL}/api/login`;
    } catch (error) {
      console.error("Failed to fetch Google auth URL: ", error);
      alert("Unable to initiate Google login. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-no-repeat bg-main-bg bg-center bg-cover min-h-screen flex items-center justify-center text-center p-8">
      <div className="bg-white px-6 py-10 rounded-lg border-t-2 border-t-[#6777ef] space-y-8 max-w-80">
        <img
          className="w-auto h-20"
          src="src/assets/lbs-login-logo.png"
          alt="Lagos Business School Logo"
        />
        <h1 className="text-[#6c757d] font-bold text-xl">
          LBS Accreditation Document Viewer
        </h1>
        <div className="bg-[#ffa426] text-white p-4 rounded-md">
          {message ? <p>{message}</p> : <p>Login to view main site.</p>}
        </div>

        <hr />

        {/* Social Button Login */}
        <div className="flex flex-col gap-8">
          <button
            disabled={loading}
            onClick={handleGoogleLogin}
            className="flex items-center gap-4 bg-[#dd4b39] text-white fill-white p-2 rounded-md"
          >
            <svg
              className="w-auto h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
            </svg>
            <span>Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
