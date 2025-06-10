import React, { useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const App: React.FC = () => {
  const [refresh, setRefresh] = useState(false);

  const refreshTasks = () => setRefresh(!refresh);

  return (
    <div>
      <TaskForm onTaskCreated={refreshTasks} />
      <h1>ASLIN UI TEST</h1>
      <TaskList key={String(refresh)} />
    </div>
  );
};

export default App;
