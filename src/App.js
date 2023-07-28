import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/usertemplate/HomePage";
import DangNhap from "./Components/usertemplate/DangNhap";
import QuanLy from "./Components/admintemplate/QuanLy";
import User from "./Components/admintemplate/User";
import Film from "./Components/admintemplate/Film";
import ShowTime from "./Components/admintemplate/ShowTime";
import ChiTietPhim from "./Components/usertemplate/ChiTietPhim";
import DatVeXemPhim from "./Components/usertemplate/DatVeXemPhim";
import Page404 from "./Components/usertemplate/Page404";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dangnhap" element={<DangNhap />} />
        <Route path="*" element={<Page404 />} />

        <Route path="chitietphim/:id" element={<ChiTietPhim />} />
        <Route path="datvexemphim/:id" element={<DatVeXemPhim />} />
        <Route path="/quanly" element={<QuanLy />}>
          <Route path="/quanly/user" element={<User />} />
          <Route path="/quanly/film" element={<Film />} />
          <Route path="/quanly/showtime" element={<ShowTime />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
