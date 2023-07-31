import React, { useState } from "react";
import * as yup from "yup";

import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { giaoTiepAPI } from "../../redux/giaoTiepAPI";
import { useDispatch } from "react-redux";
import { getAllDanhSachPhim } from "../../redux/reduxSlice";

const UpHinh = ({ myEdit }) => {
  const dispatch = useDispatch();
  const [imgSrc, setImgSrc] = useState("");
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      danhGia: "",
      ngayKhoiChieu: "",
      dangChieu: "",
      sapChieu: "",
      hot: "",
      hinhAnh: {},
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
      if (myEdit === false) {
        //   console.log("value: ", values);
        let formData = new FormData();
        //đưa giá trị từ formik vào formData
        for (let key in values) {
          if (key !== "hinhAnh") {
            formData.append(key, values[key]);
          } else {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
        //   console.log(formData.get("File"));
        //gửi formData cho backend xử lý
        giaoTiepAPI
          .themPhimUploadHinh(formData)
          .then((result) => {
            //   console.log(result);

            //gọi dispatch về cho reduxSlice
            dispatch(getAllDanhSachPhim());
            formik.resetForm();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        //code edit phim
      }
    },
  });

  const handleChangeDatePicker = (value) => {
    // console.log(moment(value.$d).format("DD/MM/YYYY"));
    let ngayKhoiChieu = moment(value?.$d).format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeFile = (e) => {
    //lấy file ra từ e
    let file = e.target.files[0];

    //tạo đối tượng để đọc file
    let reader = new FileReader();

    //bắt định dạng file
    if (file.type === "image/png" || "image/jpeg" || "image/gif") {
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        let base64 = e.target.result;
        setImgSrc(base64);
      };

      //lưu thuộc tính File vào formik

      formik.setFieldValue("hinhAnh", file);
    }
  };

  return (
    <Form
      onSubmitCapture={formik.handleSubmit}
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{
        maxWidth: 400,
      }}
    >
      <Form.Item label="Tên phim">
        <Input
          name="tenPhim"
          value={formik.tenPhim}
          onChange={formik.handleChange}
        />
      </Form.Item>
      <Form.Item label="Trailer">
        <Input name="trailer" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Mô tả">
        <Input name="moTa" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="DatePicker">
        <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} />
      </Form.Item>
      <Form.Item label="Đang chiếu" valuePropName="checked">
        <Switch onChange={handleChangeSwitch("dangChieu")} />
      </Form.Item>
      <Form.Item label="Sắp chiếu" valuePropName="checked">
        <Switch onChange={handleChangeSwitch("sapChieu")} />
      </Form.Item>
      <Form.Item label="Hot" valuePropName="checked">
        <Switch onChange={handleChangeSwitch("hot")} />
      </Form.Item>

      <Form.Item label="Số sao">
        <InputNumber onChange={handleChangeInputNumber("danhGia")} />
      </Form.Item>
      <Form.Item label="Hình ảnh">
        <input
          type="file"
          accept="image/png, image/jpeg, image/gif"
          onChange={handleChangeFile}
        />
        <br />
        {imgSrc !== "" ? (
          <img height={200} width={200} src={imgSrc} alt="..." />
        ) : (
          <></>
        )}
      </Form.Item>

      <button type="submit" className="myButton">
        {myEdit ? "Cập nhật" : "Thêm phim"}
      </button>
    </Form>
  );
};
export default UpHinh;
