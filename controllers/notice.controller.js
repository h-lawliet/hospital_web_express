import Notice from "../models/notice.model.js"
import { CurrentTime } from "../config/timenow.js"


export const getNotice = async (req, res) => {
  try {
    const notices = await Notice.find() //전체 컬랙션 가져오기
    res.json(notices)
  } catch (error) {
    res.status(500).json({ message: "서버 오류", error });
  }
}

export const getNoticeDetail = async (req, res) => {
  try {
    const id = req.params.id
    let noticeData

    if (req.session.user) {
      noticeData = await Notice.findById(id)
      if (!noticeData) {
        res.json({state: 1, message: "유효하지 않은 ID입니다."})
      } else {
        res.json({state: 0, content: noticeData})
      }
    } else {
      noticeData = await Notice.findByIdAndUpdate(
        id, 
        { $inc: { views: 1 } }, // views 값을 1 증가
        { new: true }
      )
      if (!noticeData) {
        res.json({state: 1, message: "유효하지 않은 ID입니다."})
      } else {
        res.json({state: 0, content: noticeData})
      }
    }
  } catch (error) {
    res.status(500).json({ message: "서버 오류", error })
  }
}

export const createNotice = async (req, res) => {
  try {
    const { title, content } = req.body;
    const imageUrls = req.files?.map((file) => file.location)
    const views = 1
    const time = CurrentTime()

    if (title && content) {
      const newNotice = new Notice({ title, content, imageUrls, views, time })
      const savedNotice = await newNotice.save()
      res.status(200).json({state: 0, message: "공지사항이 등록되었습니다"})
      console.log(savedNotice)
    } else {
      res.json({state: 1, message: "제목과 내용을 모두 입력해주세요"})
    }
  } catch (error) {
    console.error(error)
    res.json({ state: 2, message: "서버 오류", error })
  }
}

export const updateNotice = async (req, res) => {

}

export const deleteNotice = async (req, res)=>{
  try {
    const id = req.params.id
    await Notice.findByIdAndDelete(id)
    res.status(200).json({ state: 0, message: "공지사항이 삭제되었습니다" })
  } catch (error) {
    console.log(error)
    res.json({ state: 2, message: "서버 오류", error })
  }
}