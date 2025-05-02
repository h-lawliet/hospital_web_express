import Notice from "../models/notice.model.js"
import { CurrentTime } from "../config/timenow.js"


export const getNotice = async (req, res) => {
  try {
    const notices = await Notice.find() //전체 컬랙션 가져오기
    res.json({ status: 200, content: notices })
  } catch (error) {
    res.json({ status: 500, message: "서버 오류", error })
  }
}

export const getNoticeDetail = async (req, res) => {
  try {
    const id = req.params.id
    let noticeData

    if (req.session.user === "admin") {
      noticeData = await Notice.findById(id)
      if (!noticeData) {
        res.json({ status: 404, message: "공지사항을 찾을 수 없습니다."})
      } else {
        res.json({ status: 200, content: noticeData})
      }
    } else {
      noticeData = await Notice.findByIdAndUpdate(
        id, 
        { $inc: { views: 1 } }, // views 값을 1 증가
        { new: true }
      )
      if (!noticeData) {
        res.json({status: 404, message: "공지사항을 찾을 수 없습니다."})
      } else {
        res.json({status: 200, content: noticeData})
      }
    }
  } catch (error) {
    res.json({ status: 500, message: "서버 오류", error })
  }
}

export const getActiveNotice = async (req, res) => {
  const now = new Date()
  const allNotices = await Notice.find({})
  
  const activeNotices = allNotices.filter(notice => {
    try {
      const end = new Date(`${notice.endDate}T23:59:59`) // 문자열 → Date 변환
      return end >= now
    } catch (e) {
      return false // 변환 실패 시 무시
    }
  })
  if (activeNotices.length > 0) {
    res.json({ status: 200, content: activeNotices})
  } else {
    res.json({ status: 404, message: '활성 공지사항이 없습니다.' })
  }
}

export const createNotice = async (req, res) => {
  try {
    const { title, content, endDate } = req.body
    const imageUrls = req.files?.map((file) => file.location)
    const views = 0
    const time = CurrentTime()

    if (title && endDate) {
      const newNotice = new Notice({ title, content, endDate, imageUrls, views, time })
      const savedNotice = await newNotice.save()
      res.json({status: 200, message: "공지사항이 등록되었습니다"})
      console.log("공지사항 등록 : ", savedNotice)
    } else {
      res.json({status: 400, message: "필수항목을 모두 입력해주세요"})
    }
  } catch (error) {
    console.error(error)
    res.json({ status: 500, message: "서버 오류", error })
  }
}

export const updateNotice = async (req, res) => {
  try {
    const { title, content, endDate } = req.body
    const files = req.files

    const id = req.params.id
    const notice = await Notice.findById(id)

    if (!notice) {
      return res.json({ status: 404, message: "공지사항을 찾을 수 없습니다." })
    }

    if (title && content && endDate) {
      notice.title = title
      notice.content = content
      notice.endDate = endDate
      files.map((e)=>{
        notice.imageUrls.push(e.location)
      })
      await notice.save()
      res.json({ status: 200, message: "공지사항이 수정되었습니다." })
    } else {
      res.json({ status: 400, message: "필수항목을 모두 입력해주세요"})
    }
  } catch (error) {
    console.error("공지사항 수정 오류 : ", error)
    res.json({ status: 500, message: "서버 오류" })
  }
}

export const deleteNotice = async (req, res)=>{
  try {
    const id = req.params.id
    await Notice.findByIdAndDelete(id)
    res.json({ status: 200, message: "공지사항이 삭제되었습니다" })
  } catch (error) {
    console.log(error)
    res.json({ status: 500, message: "서버 오류", error })
  }
}


export const deletePic = async (req, res)=>{
  
  try {
    const id = req.params.id
    const { imgUrl } = req.body
    const notice = await Notice.findById(id)

    if (!notice) {
      return res.json({ status: 404, message: '공지사항을 찾을 수 없습니다.' })
    }

    notice.imageUrls = notice.imageUrls.filter(url => url !== imgUrl)
    await notice.save()

    return res.json({ status: 200, message: '이미지 삭제 완료', modified: notice })

  } catch (error) {
    console.error('공지사항 이미지 삭제 에러:', error)
    return res.json({ status: 500, message: '서버 오류 발생' })
  }
}