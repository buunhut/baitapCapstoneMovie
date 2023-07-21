import React from "react";
import "./dangnhap.scss";
import { Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { giaoTiepAPI } from "../../redux/giaoTiepAPI";
import { message } from "antd";
import { dangNhap } from "../../redux/reduxSlice";
import { myLocalStore } from "../../redux/myLocalStore";

const DangNhap = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const duLieu = useSelector((state) => state.duLieu);
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
  //
  const onChange = (key) => {
    // console.log(key);
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
              type="password"
              placeholder="Mật khẩu"
              onChange={handleChange}
              onBlur={handleBlur}
            />
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
        <form>
          <div className="inputItem">
            <input
              id="taiKhoan"
              name="taiKhoan"
              type="text"
              placeholder="Tài khoản"
            />
          </div>
          <p className="myAlert">Thông báo</p>

          <div className="inputItem">
            <input
              id="matKhau"
              name="matKhau"
              type="password"
              placeholder="Mật khẩu"
            />
          </div>
          <p className="myAlert">Thông báo</p>

          <div className="inputItem">
            <input id="hoTen" name="hoTen" type="text" placeholder="Họ tên" />
          </div>
          <p className="myAlert">Thông báo</p>

          <div className="inputItem">
            <input id="email" name="email" type="text" placeholder="Email" />
          </div>
          <p className="myAlert">Thông báo</p>

          <div className="inputItem">
            <input
              id="soDt"
              name="soDt"
              type="text"
              placeholder="Số điện thoại"
            />
          </div>
          <p className="myAlert">Thông báo</p>

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
    <div id="dangNhap">
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
  );
};

export default DangNhap;
