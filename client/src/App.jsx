import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MyTasks from './pages/MyTasks';
import AssignedTasks from './pages/AssignedTasks';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-tasks" element={<MyTasks />} />
        <Route path="/assigned-tasks" element={<AssignedTasks />} />
      </Routes>
    </Router>
  );
}

export default App;