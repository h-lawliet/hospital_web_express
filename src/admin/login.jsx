import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Login = ({ setUser }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const handleLogin = async (e) => {

    e.preventDefault();
    try {
      const res = await api.post(
        "/login",
        { id, password },
        { withCredentials: true }
      );
      setUser(id);
      setError("");
      navigate("/api/admin")
    } catch (err) {
      setError("아이디 또는 비밀번호가 틀렸습니다.");
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <h4>로그인 정보는 2시간 동안 유지되며 2시간이 지나면 자동 로그아웃됩니다</h4>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="아이디" value={id} onChange={(e) => setId(e.target.value)} required /><br/>
        <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} required /><br/>
        <button type="submit">로그인</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;