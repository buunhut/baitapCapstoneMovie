import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Modal, Switch, Upload } from "antd";
import React, { useState } from "react";
import * as Yup from "yup";
import { giaoTiepAPI } from "../../redux/giaoTiepAPI";
import moment from "moment";
import { wait } from "@testing-library/user-event/dist/utils";
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

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
    soSao: Yup.string().required("Vui lòng nhập số sao."),
    ngayKhoiChieu: Yup.string().required("Vui lòng chọn ngày khởi chiếu."),
  });

  const onFinish = async (values) => {
    console.log(values);

    let formData = new FormData();
    formData.append("tenPhim", values.tenPhim);
    formData.append("trailer", values.trailer);
    formData.append("moTa", values.moTa);
    formData.append(
      "ngayKhoiChieu",
      moment(values.ngayKhoiChieu.$d).format("DD/MM/YYYY")
    );
    formData.append("sapChieu", values.sapChieu);
    formData.append("dangChieu", values.dangChieu);
    formData.append("hot", values.hot);
    formData.append("soSao", 5);
    formData.append("danhGia", values.danhGia);
    formData.append("maNhom", "GP01");
    formData.append(
      "File",
      values.hinhAnh[0].originFileObj.blob,
      values.hinhAnh[0].name
    );

    // console.log(values.hinhAnh[0].originFileObj.blob);
    // console.log(formData.get("File"));
    // console.log(formData.get("ngayKhoiChieu"));
    // let blobImg = "";
    // await fetch(values.hinhAnh[0].thumbUrl)
    //   .then(function (response) {
    //     return response.blob();
    //   })
    //   .then(function (blob) {
    //     console.log("ASIGN");
    //     blobImg = new Blob([blob], { type: "image/jpeg" });
    //     // here the image is a blob
    //   });
    // console.log(blobImg);
    // formData.append("File", blobImg, "");
    // console.log(formData.get("File"), "FORM");
    // Append the uploaded image file to the FormData object
    // if (values.hinhAnh && values.hinhAnh[0]) {
    await giaoTiepAPI
      .themPhimUploadHinh(formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  //chỉnh sửa handleChange để lấy thông tin file
  const handleChange = ({ fileList: newFileList }) => {
    // Convert the file to a Blob
    const file = newFileList[0]?.originFileObj;
    if (file) {
      const fileBlob = new Blob([file]);
      file.blob = fileBlob;
    }
    setFileList(newFileList);
  };
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
          label="Số sao"
          name="soSao"
          rules={[
            {
              validator: (_, value) =>
                validationSchema
                  .validateAt("soSao", { soSao: value })
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
          <DatePicker format={"DD/MM/YYYY"} />
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
          label="Hình ảnh"
          name="hinhAnh"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            //   action="/upload.do"
            fileList={fileList} // Provide the fileList from state
            listType="picture-card"
            multiple={true}
            showUploadList={true}
            beforeUpload={() => false} // Prevent immediate upload on file selection
            onChange={handleChange} // Handle change and reorder action
            //   onRemove={handleRemove} // Handle remove action
            onPreview={handlePreview} // Handle preview action
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 5 }}>Chọn hình</div>
            </div>
          </Upload>
        </Form.Item>
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>

        <Form.Item>
          <Button
            // type="primary"
            htmlType="submit"
            style={{
              width: "340px",
              margin: "0 auto",
              backgroundColor: "blueviolet",
              color: "white",
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
