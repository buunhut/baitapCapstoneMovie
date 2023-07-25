import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MyHeader from "./Components/usertemplate/MyHeader";
import HomePage from "./Components/usertemplate/HomePage";
import DangNhap from "./Components/usertemplate/DangNhap";
import QuanLy from "./Components/admintemplate/QuanLy";
import CumRap from "./Components/usertemplate/CumRap";
import User from "./Components/admintemplate/User";
import Film from "./Components/admintemplate/Film";
import ShowTime from "./Components/admintemplate/ShowTime";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="/dangnhap" element={<DangNhap />} />
        </Route>
        <Route path="/quanly" element={<QuanLy />} >
          <Route path="/quanly/user" element={<User />} />
          <Route path="/quanly/film" element={<Film />} />
          <Route path="/quanly/showtime" element={<ShowTime />} />


        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
