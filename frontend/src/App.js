import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserForm from "./pages/UserForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserForm />} />
      </Routes>
    </Router>
  );
};

export default App;
