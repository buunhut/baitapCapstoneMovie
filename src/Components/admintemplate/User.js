import "./user.scss";
import React, { useEffect, useState } from "react";
import { giaoTiepAPI } from "../../redux/giaoTiepAPI";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../redux/reduxSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Popconfirm, message } from "antd";

const User = () => {
  const dispatch = useDispatch();
  const [myWidth, setMyWidth] = useState(0);
  const [myEdit, setMyEdit] = useState(false);

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  const { danhSachNguoiDung } = useSelector((state) => state.duLieu);
  //chức năng xoá tài khoản
  const handleXoa = (taiKhoan) => {
    giaoTiepAPI
      .xoaNguoiDung(taiKhoan)
      .then((result) => {
        dispatch(getAllUser());
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //gáng dữ liệu lại cho input khi click sửa
  const handleSua = (taiKhoan) => {
    const nguoiDungCanSua = danhSachNguoiDung.find(
      (user) => user.taiKhoan === taiKhoan
    );

    // Gán giá trị lại cho input
    formik.setValues({
      taiKhoan: nguoiDungCanSua.taiKhoan,
      matKhau: nguoiDungCanSua.matKhau,
      hoTen: nguoiDungCanSua.hoTen,
      email: nguoiDungCanSua.email,
      soDt: nguoiDungCanSua.soDT,
      maNhom: nguoiDungCanSua.maNhom, //API gọi lên không có
      maLoaiNguoiDung: nguoiDungCanSua.maLoaiNguoiDung,
    });

    setMyWidth(400);
    setMyEdit(true);
  };
  const [messageApi, contextHolder] = message.useMessage();
  //xử lý form bằng formik
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      soDt: "",
      maNhom: "",
      maLoaiNguoiDung: "",
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
      maLoaiNguoiDung: yup
        .string()
        .required("Vui lòng chọn mã loại người dùng"),
      maNhom: yup.string().required("Vui lòng chọn mã nhóm"),
    }),
    onSubmit: (values) => {
      if (myEdit) {
        giaoTiepAPI
          .capNhatThongTinNguoiDung(values)
          .then((result) => {
            messageApi.success("Cập nhật người dùng thành công");
            dispatch(getAllUser());
            setMyWidth(0);
            setMyEdit(false);
          })
          .catch((error) => {
            messageApi.error("Cập nhật người dùng thất bại");
          });
      } else {
        giaoTiepAPI
          .themNguoiDung(values)
          .then((result) => {
            messageApi.success("Thêm người dùng thành công");
            dispatch(getAllUser());
            setMyWidth(0);
            setMyEdit(false);
          })
          .catch((error) => {
            messageApi.error("Thêm người dùng thất bại");
          });
      }
    },
  });
  const { handleBlur, handleChange, handleSubmit, values } = formik;

  //ẩn hiện mật khẩu
  const [hienMatKhau, setHienMatKhau] = useState(false);

  const anHienMatKhau = () => {
    setHienMatKhau((anMatKhau) => !anMatKhau);
  };

  //chức năng tìm kiếm
  const handleTimKiemNguoiDung = (event) => {
    const khachHang = event.target.value.trim().toLowerCase();
    const ketQuaTimKiem = danhSachNguoiDung.filter(
      (nguoiDung) =>
        nguoiDung.taiKhoan.toLowerCase().includes(khachHang) ||
        nguoiDung.hoTen.toLowerCase().includes(khachHang)
    );
    // Set the filtered data to be displayed
    setDanhSachTimKiem(ketQuaTimKiem);
  };
  const [danhSachTimKiem, setDanhSachTimKiem] = useState(danhSachNguoiDung);
  //cập nhật danh sách tìm kiếm
  useEffect(() => {
    setDanhSachTimKiem(danhSachNguoiDung);
  }, [danhSachNguoiDung]);

  return (
    <div id="user">
      {contextHolder}
      <button
        type="button"
        id="addUser"
        onClick={() => {
          if (myWidth === 0) {
            setMyWidth(400);
            setMyEdit(false);
            formik.resetForm();
          } else {
            setMyWidth(0);
            setMyEdit(false);
            formik.resetForm();
          }
        }}
      >
        Thêm người dùng
      </button>
      <div className="timKiem">
        <input
          type="text"
          placeholder="Tìm tên người dùng..."
          onKeyUp={handleTimKiemNguoiDung}
          autoFocus
        />
      </div>
      <div className="myTable">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tài Khoản</th>
              <th>Họ Tên</th>
              <th>Email</th>
              <th>Số Điện Thoại</th>
              <th>Loại người dùng</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {danhSachTimKiem.map((item, index) => {
              // console.log(item);
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.taiKhoan}</td>
                  <td>{item.hoTen}</td>
                  <td>{item.email}</td>
                  <td>{item.soDT}</td>
                  <td>
                    {item.maLoaiNguoiDung === "QuanTri"
                      ? "Quản trị"
                      : "Khách hàng"}
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleSua(item.taiKhoan)}
                    >
                      Sửa
                    </button>
                    <Popconfirm
                      placement="top"
                      title="Xoá tài khoản"
                      description="Bạn chắc muốn xoá không?"
                      onConfirm={() => handleXoa(item.taiKhoan)}
                      okText="Xoá"
                      cancelText="Không"
                    >
                      <Button id="myButtonDangXuat">
                        <span>Xoá</span>
                      </Button>
                    </Popconfirm>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* <Table
        columns={columns}
        dataSource={danhSachNguoiDung.length > 0 && newDanhSachNguoiDung}
        rowKey="id"
      /> */}
      </div>
      <div id="myForm" style={{ width: myWidth }}>
        <h1>Quản lý tài khoản</h1>
        <form onSubmit={handleSubmit}>
          <div className="formItem">
            <input
              id="taiKhoan"
              name="taiKhoan"
              value={values.taiKhoan}
              type="text"
              placeholder="Tài khoản"
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={myEdit}
            />
          </div>
          {formik.errors.taiKhoan && formik.touched.taiKhoan ? (
            <p>{formik.errors.taiKhoan}</p>
          ) : (
            <p></p>
          )}
          <div className="formItem">
            <input
              id="matKhau"
              name="matKhau"
              value={values.matKhau}
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
            <p>{formik.errors.matKhau}</p>
          ) : (
            <p></p>
          )}{" "}
          <div className="formItem">
            <input
              id="hoTen"
              name="hoTen"
              value={values.hoTen}
              type="text"
              placeholder="Họ tên"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {formik.errors.email && formik.touched.email ? (
            <p>{formik.errors.email}</p>
          ) : (
            <p></p>
          )}
          <div className="formItem">
            <input
              id="email"
              name="email"
              value={values.email}
              type="text"
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {formik.errors.email && formik.touched.email ? (
            <p>{formik.errors.email}</p>
          ) : (
            <p></p>
          )}
          <div className="formItem">
            <input
              id="soDt"
              name="soDt"
              value={values.soDt}
              type="text"
              placeholder="Số điện thoại"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {formik.errors.soDt && formik.touched.soDt ? (
            <p>{formik.errors.soDT}</p>
          ) : (
            <p></p>
          )}
          <div className="formItem">
            <select
              id="maLoaiNguoiDung"
              name="maLoaiNguoiDung"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.maLoaiNguoiDung}
            >
              <option value="">Chọn loại người dùng</option>
              <option value="QuanTri">Quản trị</option>
              <option value="KhachHang">Khách hàng</option>
            </select>
          </div>
          {formik.errors.maLoaiNguoiDung && formik.touched.maLoaiNguoiDung ? (
            <p>{formik.errors.maLoaiNguoiDung}</p>
          ) : (
            <p></p>
          )}
          <div className="formItem">
            <select
              id="maNhom"
              name="maNhom"
              value={values.maNhom}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Chọn mã nhóm</option>
              <option value="GP01">GP01</option>
              <option value="GP02">GP02</option>
              <option value="GP03">GP03</option>
              <option value="GP04">GP04</option>
              <option value="GP05">GP05</option>
              <option value="GP06">GP06</option>
              <option value="GP07">GP07</option>
              <option value="GP08">GP08</option>
              <option value="GP09">GP09</option>
            </select>
          </div>
          {formik.errors.maNhom && formik.touched.maNhom ? (
            <p>{formik.errors.maNhom}</p>
          ) : (
            <p></p>
          )}
          <div>
            <button type="submit" className="them">
              {myEdit ? "Cập nhật" : "Thêm người dùng"}
            </button>
          </div>
        </form>
        <button
          className="myClose"
          type="button"
          onClick={() => {
            setMyWidth(0);
            setMyEdit(false);
            formik.resetForm();
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default User;
