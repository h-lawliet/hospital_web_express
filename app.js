import express from "express"
import session from "express-session"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import MongoStore from "connect-mongo"
import researchRouter from "./routes/research.route.js"
import noticeRouter from "./routes/notice.route.js"
import examinationRouter from "./routes/examination.route.js"
import reserveRouter from "./routes/reserve.route.js"
import { connectDB } from "./config/database.js"
import axios from "axios"
import { CurrentTime } from "./config/timenow.js"

dotenv.config();

const app = express()
const PORT = process.env.PORT || 3000
const CORS_API_URL = process.env.REACT_URL || "http://localhost:5173"

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: CORS_API_URL, // 리액트 도메인
    credentials: true, // 쿠키 허용
  })
);

app.set("trust proxy", 1); // 클라우드타입 프록시 신뢰

// 세션 설정
app.use(
  session({
    secret: "jh130500!", // 보안 키
    resave: false,
    store: MongoStore.create({mongoUrl: process.env.DB_URI}),
    saveUninitialized: false,
    cookie: { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      sameSite: "none", // 프론트/백 도메인 다르면 브라우저가 쿠키를 차단해버리는 경우가 있다.
      maxAge: 1000 * 60 * 60 * 2 }, // 2시간 유지
  })
)

/*
리스트 가져오기 : /api
하나 가져오기 : /api/:id
하나 추가 : /api/create
하나 업데이트 : /api/:id
하나 삭제 : /api/:id
*/
app.use("/research", researchRouter)
app.use("/notice", noticeRouter)
app.use("/examination", examinationRouter)
app.use("/reserve", reserveRouter)

const USER = { id: process.env.ADMIN_ID, password: process.env.ADMIN_PASSWORD }
// process.env.ADMIN_ID process.env.ADMIN_PASSWORD

app.post("/login", async (req, res) => {
  const { id, password } = req.body
  let userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  let now = CurrentTime()
  try {
    const response = await axios.get(`http://ip-api.com/json/${userIp}`)
    console.log(now, response.data)
  } catch (err) {
    console.log(err)
  }
  if (id === USER.id && password === USER.password) {
    req.session.user = id
    req.session.save((err) => {
      if (err) {
        console.error("세션 저장 오류:", err);
        return res.status(500).json({ success: false, message: "세션 저장 실패" });
      }
      console.log("세션 저장됨:", req.session);
      res.json({ success: true, message: "로그인 성공" });
    });
  } else {
    res.status(401).json({ success: false, message: "아이디 또는 비밀번호가 틀렸습니다." })
    console.log("(아이디 틀림)입력값 : ", req.body)
  }
})

// 로그인 상태 확인 (req.session.user에 있음)
app.get("/check", (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user })
  } else {
    res.json({ loggedIn: false })
  }
  console.log(req.session.user)
})

// 로그아웃
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ success: false, message: "로그아웃 실패" })
    res.json({ success: true, message: "로그아웃 성공" })
  })
})

app.listen(PORT, () => {
  connectDB()
  console.log(`Server running on port ${PORT}`)
})