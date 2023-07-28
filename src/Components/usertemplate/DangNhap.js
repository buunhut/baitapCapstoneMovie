import React, { useState } from "react";
import MyHeader from "./MyHeader";
import MyFooter from "./MyFooter";
import "./dangnhap.scss";
import { Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { giaoTiepAPI } from "../../redux/giaoTiepAPI";
import { message } from "antd";
import { dangNhap } from "../../redux/reduxSlice";
import { myLocalStore } from "../../redux/myLocalStore";

const DangNhap = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  // const duLieu = useSelector((state) => state.duLieu);
  //   console.log(duLieu);
  //xử lý form bằng formik đăng nhập
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    validationSchema: yup.object({
      taiKhoan: yup.string().required("Vui lòng nhập tài khoản"),
      matKhau: yup.string().required("Vui lòng nhập mật khẩu"),
    }),
    onSubmit: (values) => {
      giaoTiepAPI
        .checkDangNhap(values)
        .then((result) => {
          dispatch(dangNhap(result.data.content));
          myLocalStore.luuLocalStore("user", result.data.content);

          messageApi.success("Đăng nhập thành công");
          const { maLoaiNguoiDung } = result.data.content;
          maLoaiNguoiDung === "QuanTri" ? navigate("/quanly") : navigate("/");
        })
        .catch((error) => {
          messageApi.error("Đăng nhập thất bại");
        });
    },
  });
  const { handleBlur, handleChange, handleSubmit } = formik;
  //xử lý form đăng ký
  const formikRegister = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      soDt: "",
      maNhom: "GP01",
    },
    validationSchema: yup.object({
      taiKhoan: yup.string().required("Vui lòng nhập tài khoản"),
      matKhau: yup
        .string()
        .required("Vui lòng nhập mật khẩu")
        .matches(
          /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
          "Mật khẩu ít nhất 6 ký tự, phải có ký tự hoa và đặc biệt"
        ),
      hoTen: yup.string().required("Vui lòng nhập họ tên"),
      email: yup
        .string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập email"),
      soDt: yup
        .string()
        .required("Vui lòng nhập số điện thoại")
        .matches(/^\d+$/, "Số điện thoại chỉ được chứa số")
        .max(11, "Số điện thoại tối đa 11 ký tự"),
    }),
    onSubmit: (values) => {
      giaoTiepAPI
        .dangKy(values)
        .then((result) => {
          messageApi.success("Đăng ký thành công");
        })
        .catch((error) => {
          messageApi.error("Đăng ký thất bại");
        });
    },
  });
  const {
    handleBlur: handleBlurRegister,
    handleChange: handleChangeRegister,
    handleSubmit: handleSubmitRegister,
  } = formikRegister;

  const [hienMatKhau, setHienMatKhau] = useState(false);

  // Function to handle password visibility toggle
  const anHienMatKhau = () => {
    setHienMatKhau((anMatKhau) => !anMatKhau);
  };

  const onChange = (key) => {
    setHienMatKhau(false);
  };
  const items = [
    {
      key: "1",
      label: `Đăng nhập`,
      children: (
        <form onSubmit={handleSubmit}>
          <div className="inputItem">
            <input
              id="taiKhoan"
              name="taiKhoan"
              type="text"
              placeholder="Tài khoản"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {formik.errors.taiKhoan && formik.touched.taiKhoan ? (
            <p className="myAlert">{formik.errors.taiKhoan}</p>
          ) : (
            <p></p>
          )}

          <div className="inputItem">
            <input
              id="matKhau"
              name="matKhau"
              type={hienMatKhau ? "text" : "password"}
              placeholder="Mật khẩu"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={anHienMatKhau}
            >
              {/* thay đổi icon */}
              {hienMatKhau ? (
                <i className="fa-solid fa-eye-slash"></i>
              ) : (
                <i className="fa-solid fa-eye"></i>
              )}
            </button>
          </div>

          {formik.errors.matKhau && formik.touched.matKhau ? (
            <p className="myAlert">{formik.errors.matKhau}</p>
          ) : (
            <p></p>
          )}
          <div>
            <button className="myButton" type="submit">
              Đăng nhập
            </button>
          </div>
        </form>
      ),
    },
    {
      key: "2",
      label: `Đăng ký`,
      children: (
        <form onSubmit={handleSubmitRegister}>
          <div className="inputItem">
            <input
              id="taiKhoan"
              name="taiKhoan"
              type="text"
              placeholder="Tài khoản"
              onChange={handleChangeRegister}
              onBlur={handleBlurRegister}
            />
          </div>
          {formikRegister.errors.taiKhoan && formikRegister.touched.taiKhoan ? (
            <p className="myAlert">{formikRegister.errors.taiKhoan}</p>
          ) : (
            <p></p>
          )}

          <div className="inputItem">
            <input
              id="matKhau"
              name="matKhau"
              type={hienMatKhau ? "text" : "password"}
              placeholder="Mật khẩu"
              onChange={handleChangeRegister}
              onBlur={handleBlurRegister}
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={anHienMatKhau}
            >
              {/* thay đổi icon */}
              {hienMatKhau ? (
                <i className="fa-solid fa-eye-slash"></i>
              ) : (
                <i className="fa-solid fa-eye"></i>
              )}
            </button>
          </div>
          {formikRegister.errors.matKhau && formikRegister.touched.matKhau ? (
            <p className="myAlert">{formikRegister.errors.matKhau}</p>
          ) : (
            <p></p>
          )}

          <div className="inputItem">
            <input
              id="hoTen"
              name="hoTen"
              type="text"
              placeholder="Họ tên"
              onChange={handleChangeRegister}
              onBlur={handleBlurRegister}
            />
          </div>
          {formikRegister.errors.hoTen && formikRegister.touched.hoTen ? (
            <p className="myAlert">{formikRegister.errors.hoTen}</p>
          ) : (
            <p></p>
          )}

          <div className="inputItem">
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              onChange={handleChangeRegister}
              onBlur={handleBlurRegister}
            />
          </div>
          {formikRegister.errors.email && formikRegister.touched.email ? (
            <p className="myAlert">{formikRegister.errors.email}</p>
          ) : (
            <p></p>
          )}

          <div className="inputItem">
            <input
              id="soDt"
              name="soDt"
              type="text"
              placeholder="Số điện thoại"
              onChange={handleChangeRegister}
              onBlur={handleBlurRegister}
            />
          </div>
          {formikRegister.errors.soDt && formikRegister.touched.soDt ? (
            <p className="myAlert">{formikRegister.errors.soDt}</p>
          ) : (
            <p></p>
          )}

          <div>
            <button className="myButton" type="submit">
              Đăng ký
            </button>
          </div>
        </form>
      ),
    },
  ];
  const navigate = useNavigate();

  return (
    <>
      <MyHeader />
      <div id="dangNhap">
        <div id="dangNhapContent">
          <button
            type="button"
            className="closer"
            onClick={() => {
              navigate("/");
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          {contextHolder}

          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      </div>
      <MyFooter />
    </>
  );
};

export default DangNhap;
