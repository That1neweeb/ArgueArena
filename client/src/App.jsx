import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login    from './features/Login';
import Register from './features/Register';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"         element={<Navigate to="/login" replace />} />
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}