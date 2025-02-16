export const checkAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.json({ state: 3, message: "로그인 후 이용해주세요" });
  }
  next();
}