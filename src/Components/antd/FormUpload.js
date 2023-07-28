import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Switch, Upload } from "antd";
import React from "react";
import * as Yup from "yup";
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const FormUpload = () => {
  //dùng yup check validation
  const validationSchema = Yup.object().shape({
    tenPhim: Yup.string()
      .required("Vui lòng nhập tên phim.")
      .min(5, "Tên phim phải có ít nhất 5 ký tự."),
    trailer: Yup.string().required("Vui lòng nhập trailer."),
    moTa: Yup.string()
      .required("Vui lòng nhập mô tả.")
      .min(20, "Mô tả phải có ít nhất 20 ký tự."),
    ngayKhoiChieu: Yup.string().required("Vui lòng chọn ngày khởi chiếu."),
  });

  const onFinish = (values) => {
    // Handle form submission here
    console.log("Form values:", values);
  };

  //   const hanhdleThemPhim = () => {
  //     // alert();
  //   };
  return (
    <>
      <Form
        onFinish={onFinish}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 20,
        }}
        layout="horizontal"
        style={{
          maxWidth: 400,
        }}
      >
        <Form.Item
          label="Tên phim"
          name="tenPhim"
          rules={[
            {
              validator: (_, value) =>
                validationSchema
                  .validateAt("tenPhim", { tenPhim: value })
                  .then(() => Promise.resolve())
                  .catch((error) => Promise.reject(error.message)),
            },
          ]}
          validateTrigger={["onBlur", "onChange"]} // bắt onBlur và onChange
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Trailer"
          name="trailer"
          rules={[
            {
              validator: (_, value) =>
                validationSchema
                  .validateAt("trailer", { trailer: value })
                  .then(() => Promise.resolve())
                  .catch((error) => Promise.reject(error.message)),
            },
          ]}
          validateTrigger={["onBlur", "onChange"]} // bắt onBlur và onChange
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="moTa"
          rules={[
            {
              validator: (_, value) =>
                validationSchema
                  .validateAt("moTa", { moTa: value })
                  .then(() => Promise.resolve())
                  .catch((error) => Promise.reject(error.message)),
            },
          ]}
          validateTrigger={["onBlur", "onChange"]} // bắt onBlur và onChange
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Ngày khởi chiếu"
          name="ngayKhoiChieu"
          rules={[
            {
              validator: (_, value) =>
                validationSchema
                  .validateAt("ngayKhoiChieu", { ngayKhoiChieu: value })
                  .then(() => Promise.resolve())
                  .catch((error) => Promise.reject(error.message)),
            },
          ]}
          validateTrigger={["onBlur", "onChange"]} // bắt onBlur và onChange
        >
          <DatePicker />
        </Form.Item>
        <Form.Item label="Đăng chiếu" name="dangChieu" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Sắp chiếu" name="sapChieu" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Hot" name="hot" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item
          label="Upload"
          name="hinhAnh"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 5,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button
            // onClick={hanhdleThemPhim}
            type="primary"
            htmlType="submit"
            style={{
              width: "340px",
              margin: "0 auto",
              backgroundColor: "blueviolet",
            }}
          >
            Thêm phim
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default FormUpload;
