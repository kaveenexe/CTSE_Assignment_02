import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddEventRegister from "./pages/AddEventRegister";
import AllRegisteredUsers from "./pages/AllRegisteredUsers";
import UpdateEventRegister from "./pages/UpdateEventRegister";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="add-event" element={<AddEventRegister />} />
          <Route path="all-users" element={<AllRegisteredUsers />} />
          <Route path="update-event/:id" element={<UpdateEventRegister />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;