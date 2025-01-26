import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserForm from "./pages/UserForm";
import UserList from "./pages/UserList";
import Header from "./component/Header";
import Footer from "./component/Footer";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/user-detail" element={<UserList />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
