import { Navigate,Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

export default function ProtectedRoute(){
    const {user, loading} = useAuth();
    
    if(loading) return <>"loading"</>;

if(!user) {
        return <Navigate to="/" replace />;
    }
    return <Outlet/>;
}