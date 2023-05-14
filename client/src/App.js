import { Routes, Route } from "react-router-dom";
import Home from './pages/Home.js';
import Dashboard from "./pages/Dashboard.js";
import PrivateRoute from "./component/Routes/PrivateRoute.js";
import CreateUser from "./pages/admin/CreateUser.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/dashboard" element={<PrivateRoute /> }>
        <Route path="admin" element={<Dashboard/>}/>
        <Route path="admin/create-user" element={<CreateUser/>} />
      </Route>
    </Routes>
  );
}

export default App;
