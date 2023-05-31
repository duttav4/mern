import { Routes, Route } from "react-router-dom";
import Home from './pages/Home.js';
import Dashboard from "./pages/Dashboard.js";
import PrivateRoute from "./component/Routes/PrivateRoute.js";
import CreateUser from "./pages/admin/CreateUser.js";
import CreateHospital from "./pages/admin/CreateHospital.js";
import AddHospital from "./pages/admin/AddHospital.js";
import EditHospital from "./pages/admin/EditHospital.js";
import CreatePackage from "./pages/admin/CreatePackage.js";
import CreateRole from "./pages/admin/CreateRole.js";
import CreateCapability from "./pages/admin/CreateCapability.js";
import PatientRegistration from "./pages/PatientRegistration.js";
import PatientRegister from "./pages/PatientRegister.js";
import PatientMaster from "./pages/admin/PatientMaster.js";

function App()
{
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/patient-registration" element={<PatientRegister />} />
      <Route path="/patient-register" element={<PatientRegister />} />
      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="admin" element={<Dashboard />} />
        <Route path="admin/manage-user" element={<CreateUser />} />
        <Route path="admin/create-role" element={<CreateRole />} />
        <Route path="admin/create-capability" element={<CreateCapability />} />
        <Route path="admin/create-hospital" element={<CreateHospital />} />
        <Route path="admin/add-hospital" element={<AddHospital />} />
        <Route path="admin/edit-hospital/:slug" element={<EditHospital />} />
        <Route path="admin/create-package" element={<CreatePackage />} />
        <Route path="admin/patient-master" element={<PatientMaster />} />
      </Route>
    </Routes>
  );
}

export default App;
