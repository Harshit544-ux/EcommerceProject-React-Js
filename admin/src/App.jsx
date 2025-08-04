import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./component/Navbar";
import Sidebar from "./component/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import Order from "./pages/Order";
import Login from "./component/Login";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('admin-token') || '');

  return (
    <div className="bg-gray-50 min-h-screen">
      {
        token === "" ? (
          <Login setToken={setToken} />
        ) : (
          <>
            <Navbar setToken={setToken} />
            <hr />
            <div className="flex w-full">
              <Sidebar />
              <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-800 text-base">
                <Routes>
                  <Route path='/add' element={<Add setToken={setToken} />} />
                  <Route path='/list' element={<List setToken={setToken} />} />
                  <Route path='/orders' element={<Order setToken={setToken} />} />
                </Routes>
              </div>
            </div>
          </>
        )
      }
    </div>
  );
}
