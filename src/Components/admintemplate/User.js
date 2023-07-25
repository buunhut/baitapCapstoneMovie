import "./user.scss";
import React, { useEffect, useState } from "react";
import { giaoTiepAPI } from "../../redux/giaoTiepAPI";
import { Space, Table, Tag, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../redux/reduxSlice";

const User = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);
  const { danhSachNguoiDung } = useSelector((state) => state.duLieu);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Taif Khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Họ Tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "soDT",
      key: "soDT",
    },
    {
      title: "Loại Người Dùng",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
      render: (text, record, index) => {
        return <Tag> {text === "QuanTri" ? "Quản Trị" : "Khách hàng"}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Xoá người dùng"
            description="Bạn có chắc muốn xoá người dùng này?"
            onConfirm={() => {
              giaoTiepAPI
                .xoaNguoiDung(record.taiKhoan)
                .then((result) => {
                  dispatch(getAllUser());
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            <button className="bg-red-600">Xoá</button>
          </Popconfirm>
          <button>Sửa</button>
        </Space>
      ),
    },
  ];
  let newDanhSachNguoiDung = danhSachNguoiDung.map((item, index) => {
    return { ...item, id: index + 1 };
  });

  return (
    <div id="user">
      <button type="button" id="addUser">
        Add user
      </button>
      <div className="myTable">
      <Table
        columns={columns}
        dataSource={danhSachNguoiDung.length > 0 && newDanhSachNguoiDung}
        rowKey="id"
      />
      </div>
    </div>
  );
};

export default User;
