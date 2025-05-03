import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import MyTasks from './pages/MyTasks';
import AssignedTasks from './pages/AssignedTasks';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-tasks" element={<MyTasks />} />
        <Route path="/assigned-tasks" element={<AssignedTasks />} />
      </Route>
    </Routes>
  );
}

export default App;