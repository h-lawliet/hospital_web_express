export const checkAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.json({ status: 401, message: "로그인이 필요합니다." })
  }
  next()
}