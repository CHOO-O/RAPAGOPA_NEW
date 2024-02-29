import React from "react";
import { Route, Routes } from "react-router-dom";
import "./styles/styles.css";

// ===================== 페이지 임포트 =======================
import Login from "./pages/Login";
import Main from "./pages/Main";
import Mypage from "./pages/Mypage";
import Myreview from "./pages/Myreview";
import Reviewform from "./pages/Reviewform";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/main" element={<Main />}></Route>
      <Route path="/mypage" element={<Mypage />}></Route>
      <Route path="/myreview" element={<Myreview />}></Route>
      <Route path="/reviewform" element={<Reviewform />}></Route>
    </Routes>
  );
}

export default App;
