import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Space, message } from 'antd';
import axios from 'axios';

const { Search } = Input;

interface Task {
  id: string;
  name: string;
  description: string;
  status: string;
  command: string;
  output: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const baseURL = 'http://localhost:8082/tasks';

  // 🟢 Load all tasks on page load
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(baseURL);
      setTasks(res.data);
    } catch (err) {
      message.error('Failed to load tasks');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 🔍 Search task by ID
  const searchTask = async (id: string) => {
    if (!id) return fetchTasks();
    try {
      const res = await axios.get(`${baseURL}/${id}`);
      setTasks([res.data]);
    } catch (err) {
      message.error('Task not found');
    }
  };

  // ❌ Delete task
  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`${baseURL}/${id}`);
      message.success('Task deleted');
      fetchTasks();
    } catch (err) {
      message.error('Failed to delete task');
    }
  };

  // ▶️ Run task command
  const runCommand = async (id: string) => {
    try {
      await axios.put(`${baseURL}/${id}/run`);
      message.success('Command executed');
      fetchTasks();
    } catch (err) {
      message.error('Failed to run command');
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Command', dataIndex: 'command', key: 'command' },
    { title: 'Output', dataIndex: 'output', key: 'output' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Task) => (
        <Space>
          <Button danger onClick={() => deleteTask(record.id)}>Delete</Button>
          <Button type="primary" onClick={() => runCommand(record.id)}>Run</Button>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>📝 Task Manager</h2>
      <Search
        placeholder="Enter task ID"
        enterButton="Search"
        onSearch={searchTask}
        style={{ width: 300, marginBottom: 20 }}
      />
      <Table
        dataSource={tasks}
        columns={columns}
        rowKey="id"
        loading={loading}
      />
    </div>
  );
};

export default TaskList;
