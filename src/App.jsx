import QRPaymentPage from "./QRPayment";
import RegistrationForm from "./RegistrationForm";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegistrationForm />} />
      <Route path="/banking" element={<QRPaymentPage/>}/>
    </Routes>
  );
}

export default App;