import "./film.scss";
import React, { useEffect, useState } from "react";
import { giaoTiepAPI } from "../../redux/giaoTiepAPI";
import { useDispatch, useSelector } from "react-redux";
import { getAllDanhSachPhim, getAllUser } from "../../redux/reduxSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Popconfirm, message } from "antd";
import moment from "moment";
import FormUpload from "../antd/FormUpload";

const Film = () => {
  const dispatch = useDispatch();
  const [myWidth, setMyWidth] = useState(0);
  const [myEdit, setMyEdit] = useState(false);

  useEffect(() => {
    //gọi dispatch về cho reduxSlice
    dispatch(getAllDanhSachPhim());
  }, [dispatch]);

  const { danhSachPhim } = useSelector((state) => state.duLieu);
  //chức năng xoá tài khoản
  const handleXoa = (maPhim) => {
    giaoTiepAPI
      .xoaPhim(maPhim)
      .then((result) => {
        dispatch(getAllDanhSachPhim());
        // console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //gáng dữ liệu lại cho input khi click sửa
  const handleSua = (tenPhim) => {
    // const phimCanSua = danhSachPhim.find(
    //   (user) => user.taiKhoan === taiKhoan
    // );
    // // Gán giá trị lại cho input
    // formik.setValues({
    //   taiKhoan: nguoiDungCanSua.taiKhoan,
    //   matKhau: nguoiDungCanSua.matKhau,
    //   hoTen: nguoiDungCanSua.hoTen,
    //   email: nguoiDungCanSua.email,
    //   soDt: nguoiDungCanSua.soDT,
    //   maNhom: nguoiDungCanSua.maNhom, //API gọi lên không có
    //   maLoaiNguoiDung: nguoiDungCanSua.maLoaiNguoiDung,
    // });
    // setMyWidth(400);
    // setMyEdit(true);
  };
  const [messageApi, contextHolder] = message.useMessage();
  //xử lý form bằng formik
  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      soSao: "",
      ngayKhoiChieu: "",
      dangChieu: "",
      sapChieu: "",
      hot: "",
      hinhAnh: "",
    },
    validationSchema: yup.object({
      // taiKhoan: yup.string().required("Vui lòng nhập tài khoản"),
      // matKhau: yup
      //   .string()
      //   .required("Vui lòng nhập mật khẩu")
      //   .matches(
      //     /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
      //     "Mật khẩu ít nhất 6 ký tự, phải có ký tự hoa và đặc biệt"
      //   ),
      // hoTen: yup.string().required("Vui lòng nhập họ tên"),
      // email: yup
      //   .string()
      //   .email("Email không hợp lệ")
      //   .required("Vui lòng nhập email"),
      // soDt: yup
      //   .string()
      //   .required("Vui lòng nhập số điện thoại")
      //   .matches(/^\d+$/, "Số điện thoại chỉ được chứa số")
      //   .max(11, "Số điện thoại tối đa 11 ký tự"),
      // maLoaiNguoiDung: yup
      //   .string()
      //   .required("Vui lòng chọn mã loại người dùng"),
      // maNhom: yup.string().required("Vui lòng chọn mã nhóm"),
    }),
    onSubmit: (values) => {
      if (myEdit) {
        giaoTiepAPI
          .capNhatThongTinNguoiDung(values)
          .then((result) => {
            messageApi.success("Cập nhật phim thành công");
            dispatch(getAllUser());
            setMyWidth(0);
            setMyEdit(false);
          })
          .catch((error) => {
            messageApi.error("Cập nhật phim thất bại");
          });
      } else {
        giaoTiepAPI
          .themNguoiDung(values)
          .then((result) => {
            messageApi.success("Thêm phimg thành công");
            dispatch(getAllUser());
            setMyWidth(0);
            setMyEdit(false);
          })
          .catch((error) => {
            messageApi.error("Thêm phim thất bại");
          });
      }
    },
  });
  const { handleBlur, handleChange, handleSubmit, values } = formik;

  //chức năng tìm kiếm
  const handleTimKiemPhim = (event) => {
    const tenPhim = event.target.value.trim().toLowerCase();
    const ketQuaTimKiem = danhSachPhim.filter((phim) =>
      phim.tenPhim.toLowerCase().includes(tenPhim)
    );
    // Set the filtered data to be displayed
    setDanhSachTimKiem(ketQuaTimKiem);
  };
  const [danhSachTimKiem, setDanhSachTimKiem] = useState(danhSachPhim);
  //cập nhật danh sách tìm kiếm
  useEffect(() => {
    setDanhSachTimKiem(danhSachPhim);
  }, [danhSachPhim]);

  return (
    <div id="film">
      {contextHolder}
      <button
        type="button"
        id="addFilm"
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
        Thêm phim
      </button>
      <div className="timKiem">
        <input
          id="tenPhim"
          type="text"
          placeholder="Tìm tên phim..."
          onKeyUp={handleTimKiemPhim}
          autoFocus
        />
      </div>
      <div className="myTable">
        <table>
          <thead>
            <tr>
              <th>Mã Phim</th>
              <th>Hình</th>
              <th>Tên Phim</th>
              <th>Ngày Khởi Chiếu</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {danhSachTimKiem.map((item, index) => {
              // console.log(item);
              return (
                <tr key={index}>
                  <td>{item.maPhim}</td>
                  <td>
                    <img src={item.hinhAnh} alt="" />
                  </td>
                  <td
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    {item.tenPhim}
                  </td>
                  <td>
                    <span style={{ color: "green", width: "100px" }}>
                      {moment(item.ngayKhoiChieu).format("DD/MM/YYYY")}
                    </span>
                    <span style={{ color: "red" }}>
                      {moment(item.ngayKhoiChieu).format(" ~ hh:mm")}
                    </span>{" "}
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
                      title="Xoá phim"
                      description="Bạn chắc muốn xoá không?"
                      onConfirm={() => handleXoa(item.maPhim)}
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
        <h1>Quản lý phim</h1>
        {/* <form onSubmit={handleSubmit}>
          <div className="formItem">
            <input
              id="tenPhim"
              name="tenPhim"
              value={values.tenPhim}
              type="text"
              placeholder="Tên phim"
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={myEdit}
            />
          </div>
          {formik.errors.tenPhim && formik.touched.tenPhim ? (
            <p>{formik.errors.tenPhim}</p>
          ) : (
            <p></p>
          )}
          <div className="formItem">
            <input
              id="trailer"
              name="trailer"
              value={values.trailer}
              placeholder="Trailer"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {formik.errors.trailer && formik.touched.trailer ? (
            <p>{formik.errors.trailer}</p>
          ) : (
            <p></p>
          )}{" "}
          <div className="formItem">
            <input
              id="moTa"
              name="moTa"
              value={values.moTa}
              type="text"
              placeholder="Mô tả"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {formik.errors.moTa && formik.touched.moTa ? (
            <p>{formik.errors.moTa}</p>
          ) : (
            <p></p>
          )}
          <div className="formItem">
            <input
              id="ngayKhoiChieu"
              name="ngayKhoiChieu"
              value={values.ngayKhoiChieu}
              type="date"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {formik.errors.ngayKhoiChieu && formik.touched.ngayKhoiChieu ? (
            <p>{formik.errors.ngayKhoiChieu}</p>
          ) : (
            <p></p>
          )}
          <div className="formItem">
            <input
              id="dangChieu"
              name="dangChieu"
              value={values.soDt}
              type="text"
              placeholder="Đang chiếu"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {formik.errors.dangChieu && formik.touched.dangChieu ? (
            <p>{formik.errors.dangChieu}</p>
          ) : (
            <p></p>
          )}
          <div className="formItem">
            <input
              id="sapChieu"
              name="sapChieu"
              value={values.sapChieu}
              type="text"
              placeholder="Sắp chiếu"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {formik.errors.sapChieu && formik.touched.sapChieu ? (
            <p>{formik.errors.sapChieu}</p>
          ) : (
            <p></p>
          )}
          <div className="formItem">
            <input
              id="hot"
              name="hot"
              value={values.hot}
              type="text"
              placeholder="Hot"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {formik.errors.hot && formik.touched.hot ? (
            <p>{formik.errors.hot}</p>
          ) : (
            <p></p>
          )}
          <div className="formItem">
            <input
              id="soSao"
              name="soSao"
              value={values.soSao}
              type="text"
              placeholder="Số sao"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {formik.errors.soSao && formik.touched.soSao ? (
            <p>{formik.errors.soSao}</p>
          ) : (
            <p></p>
          )}
          <div className="formItem hinhAnh">
            <input
              id="hinhAnh"
              name="hinhAnh"
              value={values.hinhAnh}
              type="file"
              placeholder="Hình Ảnh"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {formik.errors.soSao && formik.touched.soSao ? (
            <p>{formik.errors.soSao}</p>
          ) : (
            <p></p>
          )}
          <div>
            <button type="submit" className="them">
              {myEdit ? "Cập nhật" : "Thêm phim"}
            </button>
          </div>
        </form> */}
        <FormUpload />
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

export default Film;
