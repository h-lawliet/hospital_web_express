import Examination from "../models/examination.model.js"


export const getExamination = async (req, res) => {
  try {
    const Examinations = await Examination.find() //전체 컬랙션 가져오기
    res.json(Examinations)
  } catch (error) {
    res.status(500).json({ message: "서버 오류", error });
  }
}

export const getExaminationDetail = async (req, res) => {
  try {
    const id = req.params.id
    const ExaminationData = await Examination.findById(id)
    res.json({status: 200, content: ExaminationData})
  } catch (error) {
    res.status(500).json({ message: "서버 오류", error })
  }
}

export const createExamination = async (req, res) => {
  try {
    const { title, room, purpose, method, time, caution, result } = req.body
    const image = req.file?.location // 이미지가 없을 수도 있음

    if (title && room) {
      const newExamination = new Examination({ title, room, image, purpose, method, time, caution, result })
      const savedExamination = await newExamination.save()
      res.json({ status: 200, message: "검사안내가 등록되었습니다" })
      console.log("새 검사항목 : ", savedExamination)
    } else {
      res.json({ status: 400, message: "필수항목을 모두 입력해주세요" })
    }
  } catch (error) {
    console.error(error)
    res.json({ status: 500, message: "서버 오류", error })
  }
}

export const updateExamination = async (req, res) => {
  try {
    const id = req.params.id
    const { title, room, purpose, method, time, caution, result } = req.body;
    const image = req.file?.location; // 이미지가 없을 수도 있음

    const examination = await Examination.findById(id)
    if (!examination) {
      return res.json({ status: 404, message: "검사안내를 찾을 수 없습니다" })
    }

    const newExamination = { title, room, purpose, method, time, caution, result }
    if (image) newExamination.image = image

    const updatedExamination = await Examination.findByIdAndUpdate(id, newExamination, { new: true })
    res.json({ status: 200, message: "검사안내가 수정되었습니다" })
    console.log("검사안내 수정 : ", updatedExamination)
  } catch (error) {
    console.error(error)
    res.json({ status: 500, message: "서버 오류", error })
  }
}

export const deleteExamination = async (req, res)=>{
  try {
    const id = req.params.id
    await Examination.findByIdAndDelete(id)
    res.json({ status: 200, message: "검사안내가 삭제되었습니다" })
  } catch (error) {
    console.log(error)
    res.json({ status: 500, message: "서버 오류", error })
  }
}