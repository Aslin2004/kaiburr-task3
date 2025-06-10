import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import './form-style.css';

const TaskForm: React.FC<{ onTaskCreated: () => void }> = ({ onTaskCreated }) => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      const res = await axios.post('http://localhost:8082/tasks', values);
      console.log('Task created:', res.data);
      message.success('Task created successfully');
      form.resetFields();
      onTaskCreated(); // refresh task list
    } catch (error) {
      console.error('Error creating task:', error);
      message.error('Failed to create task');
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>➕ Create New Task</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Task ID" name="id" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input />
        </Form.Item>
        <Form.Item label="Status" name="status">
          <Input />
        </Form.Item>
        <Form.Item label="Command" name="command">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Create Task</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TaskForm;
