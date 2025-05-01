import Reserve from "../models/reserve.model.js"


export const getReserve = async (req, res) => {
  if (req.session.user) {
    try {
      const Reserves = await Reserve.find().sort({ createdAt: -1 })
      res.status(200).json({success: true, reserves: Reserves})
    } catch (error) {
      res.status(500).json({ message: "서버 오류", error });
    }
  } else {
    res.status(401).json({ success: false, message: "로그인해주세요"})
  }
}

export const createReserve = async (req, res)=>{
  try {
    const { name, phone, content } = req.body;
    
    if (name && phone && content) {
      const newReserve = new Reserve({ name, phone, content })
      const savedReserve = await newReserve.save()
      console.log(savedReserve)
      res.status(200).json({state: 0, message: "예약신청이 완료되었습니다"})
    } else {
      res.json({state: 1, message: "모든 항목을 입력해주세요"})
    }
  } catch (error) {
    console.log(error)
    res.json({ state: 2, message: "서버 오류", error })
  }
}

export const deleteReserve = async (req, res)=>{
  try {
    const id = req.params.id
    await Reserve.findByIdAndDelete(id)
    res.json({ status: 200, message: "예약정보가 삭제되었습니다" })
  } catch (error) {
    console.log(error)
    res.json({ status: 500, message: "서버 오류", error })
  }
}