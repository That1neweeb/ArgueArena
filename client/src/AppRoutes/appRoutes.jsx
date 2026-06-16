import  {Route,Routes,Outlet,Navigate} from 'react-router-dom';
import React,{Suspense} from 'react';

import ProtectedRoute from './ProtectedRoutes'

const DailyFeed = React.lazy(()  => import("../features/Daily_Mode/DailyFeed"));
const Login = React.lazy(()=> import('../pages/Login'));
const Register = React.lazy(()=> import('../pages/Register')); 

export default function AppRoutes(){
    <Routes>
        <Route element={<ProtectedRoute/>}>
            <Route path="/" element={<DailyFeed />}></Route>
        </Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register'  element={<Register/>}></Route>
    </Routes>
    
}

