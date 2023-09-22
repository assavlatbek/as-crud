import React, { useEffect, useState } from "react";

import {
  Space,
  Button,
  Table,
  Modal,
  Form,
  Input,
  Popconfirm,
  message,
} from "antd";
import request from "../server";

function TeacherPage() {
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [selected, setSelected] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const values = await form.validateFields();

    if (selected == null) {
      await request.post("teacher", { ...values });
      form.resetFields();
      setSelected(null);
    }
    if (selected) {
      await request.put(`teacher/${selected}`, values);
      form.resetFields();
      setSelected(null);
    }
    getData();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getData = async () => {
    let res = await request("teacher");
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const saveLoc = async (id) => {
    localStorage.setItem("delID", id);
  };

  async function editData(id) {
    setSelected(id);
    setIsModalOpen(true);
    const res = request.get(`teacher/${id}`);
    form.setFieldsValue((await res).data);
  }

  const delTeacher = async (id) => {
    await request.delete("teacher/" + id);
    getData();
  };

  const seeStudent = async (id) => {
    localStorage.setItem("studentID", id);
    window.location.href = "/student";
  };

  const confirm = (e) => {
    message.success("Click on Yes");
    delTeacher(localStorage.getItem("delID"));
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const handleSearch = async (e) => {
    if (e.target.value) {
      let res = await request("teacher?search=" + e.target.value);
      setData(res.data);
    } else {
      getData();
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "firstName",
      key: "firstname",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (data) => (
        <img
          width={"50px"}
          height={"50px"}
          style={{ borderRadius: "50%" }}
          src={data}
          alt=""
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => editData(record.id)}>
            Edit #{record.id}
          </Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button danger onClick={() => saveLoc(record.id)}>
              Delete
            </Button>
          </Popconfirm>
          <Button type="primary" onClick={() => seeStudent(record.id)}>
            See Student
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Modal
        title={selected ? "Edit Teacher" : "Add Teacher"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="wrap"
          form={form}
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Form.Item
            className="mb-0"
            label="Name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className="mb-0"
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className="mb-0"
            label="Avatar"
            name="avatar"
            rules={[
              {
                required: true,
                message: "Please fill by url!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <section className="scroll-sec">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "ceter",
            margin: "10px 0",
          }}
        >
          <h1>All Teachers ({data.length})</h1>
          <Input
            placeholder="Search..."
            onChange={handleSearch}
            style={{ width: "60%" }}
          />
          <Button size="large" onClick={showModal}>
            Add +
          </Button>
        </div>

        <Table key={Date.now} columns={columns} dataSource={data} />
      </section>
    </>
  );
}

export default TeacherPage;
