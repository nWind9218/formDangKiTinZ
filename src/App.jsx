import RegistrationForm from "./RegistrationForm";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegistrationForm />} />
    </Routes>
  );
}

export default App;