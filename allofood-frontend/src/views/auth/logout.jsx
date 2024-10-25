import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "context/auth/AuthContext";
import { toast, ToastContainer } from 'react-toastify';

const Logout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            try {
                await logout();
                toast.success('Logged out successfully');
                setTimeout(() => { navigate("/") }, 2000);
            } catch (error) {
                console.error('Error logging out:', error.response?.data || error.message);
                toast.error(error.response?.data?.message || 'Failed to log out');
            }
        };

        performLogout();
    }, [logout, navigate]);

    return (
        <>
            <ToastContainer />
            <div className='h-screen w-full flex items-center justify-center'>
                <span className="flex items-center justify-center">
                    <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    Logout...
                </span>
            </div>
        </>
    );
};

export default Logout;