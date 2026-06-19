import  {Route,Routes,Outlet,Navigate} from 'react-router-dom';
import React,{Suspense} from 'react';


import ProtectedRoute from './ProtectedRoutes'

const DailyFeed = React.lazy(()  => import("../features/Daily_Mode/DailyFeed"));
const Login = React.lazy(()=> import('../pages/Login'));
const Register = React.lazy(()=> import('../pages/Register')); 
const Lobby = React.lazy(() => import('../lobby/Lobby'));

export default function AppRoutes(){
    return (
        <Routes>
            <Route element={<ProtectedRoute/>}>
                <Route path='/dailyFeed' element={<DailyFeed/>}></Route>
                <Route path="/" element={<Lobby />}></Route>
                <Route path="/lobby" element={<Lobby />}></Route>
            </Route>
            
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register'  element={<Register/>}></Route>
        </Routes>
    )
}

