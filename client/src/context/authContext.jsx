import { useContext,createContext,useEffect,useState } from "react";

const AuthContext = createContext();

export function AuthProvider({children}) {

    const [user,setUser] = useState(null);
    const [loading,setloading] = useState(true);
    

    // check token on load
    useEffect ( ()=> {
        const token = localStorage.getItem("token");
        if(token) {
            // Backend token check to add
            setUser({token});
        }
        setloading(false);
    },[])

    const login = (token) => {
        localStorage.setItem("token",token);
        setUser({token});
    }

    const logout = () =>{
        localStorage.removeItem("token");
        setUser(null);
    }

    return( 
        <AuthContext.Provider value={ login,logout, loading}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);