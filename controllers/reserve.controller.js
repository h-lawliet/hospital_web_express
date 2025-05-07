import Reserve from "../models/reserve.model.js"


export const getReserve = async (req, res) => {
  try {
    const Reserves = await Reserve.find().sort({ createdAt: -1 })
    res.json({ status: 200, content: Reserves})
  } catch (error) {
    res.json({ status: 500, message: "서버 오류", error });
  }
}

export const createReserve = async (req, res)=>{
  try {
    const { name, phone, content } = req.body;
    
    if (name && phone && content) {
      const newReserve = new Reserve({ name, phone, content })
      const savedReserve = await newReserve.save()
      console.log("새로운 예약", savedReserve)
      res.json({status: 200, message: "예약신청이 완료되었습니다"})
    } else {
      res.json({ status: 400, message: "모든 항목을 입력해주세요"})
    }
  } catch (error) {
    console.log(error)
    res.json({ status: 500, message: "서버 오류", error })
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