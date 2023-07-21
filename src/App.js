import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MyHeader from "./Components/usertemplate/MyHeader";
import HomePage from "./Components/usertemplate/HomePage";
import DangNhap from "./Components/usertemplate/DangNhap";
import QuanLy from "./Components/admintemplate/QuanLy";
import CumRap from "./Components/usertemplate/CumRap";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="/dangnhap" element={<DangNhap />} />
        </Route>
        <Route path="/quanly" element={<QuanLy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
