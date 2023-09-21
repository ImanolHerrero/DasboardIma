// @ts-nocheck

import { Route, Routes } from "react-router-dom";
import Login from "./views/Login/Login";
import User from "./views/Users/User";
import SongComponent from "./views/Songs/Songs";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-lg">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/user" element={<User />} />
            <Route path="/songs" element={<SongComponent />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
