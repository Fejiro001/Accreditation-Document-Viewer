import { useEffect } from "react";

function CallBack() {
    useEffect(() => {
        const handleCallback = async () => {
            const token = new URLSearchParams(window.location.search).get('token');

            if (token) {
                localStorage.setItem('access_token')
            }
        }
    });
  return <div>CallBack</div>;
}

export default CallBack;
