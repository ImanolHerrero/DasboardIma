import { Route, Routes } from "react-router-dom";
import Login from "./views/Login/Login";
import User from "./views/Users/User";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-lg">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
