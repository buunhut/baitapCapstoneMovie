import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Upload } from "antd";
import React, { useState } from "react";
const ShowTime = () => {
  //lấy thông tin file upload
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  //chức năng onFinish form
  const onFinish = (values) => {
    console.log("form values: ", values);
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  //   const [fileList, setFileList] = useState([]);

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
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <>
      <Form
        //onFinish giống như onSubmit
        onFinish={onFinish}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 800,
        }}
      >
        {/* phải có name để lấy được giá trị của input */}
        <Form.Item name="maSanPham">
          <Input />
        </Form.Item>
        <Form.Item name="tenSanPham">
          <Input />
        </Form.Item>
        <Form.Item name="danhMuc">
          <Select>
            <Select.Option value="doAn">Đồ ăn</Select.Option>
            <Select.Option value="doUong">Đồ uống</Select.Option>
          </Select>
        </Form.Item>{" "}
        <Form.Item
          label="Upload"
          name="hinhAnh"
          valuePropName="fileList"
          getValueFromEvent={normFile} //lấy dữ liệu hình ảnh,
        >
          <Upload
            action="/"
            listType="picture-card"
            multiple={true} //cho phép chọn 1 lúc nhìu file
            onPreview={handlePreview} // cho click xem lại hình
          >
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
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
          {/* //htmlType giống như type submit */}
          <Button htmlType="submit">Button</Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default ShowTime;
