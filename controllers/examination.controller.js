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
    res.json(ExaminationData);
  } catch (error) {
    res.status(500).json({ message: "서버 오류", error });
  }
}

export const createExamination = async (req, res) => {
  try {
    const { title, room, purpose, method, time, caution, result } = req.body;
    const image = req.file?.location; // 이미지가 없을 수도 있음

    if (title && image && purpose && method && time && result) {
      const newExamination = new Examination({ title, room, image, purpose, method, time, caution, result });
      const savedExamination = await newExamination.save();
      res.status(200).json({ state: 0, message: "검사안내가 등록되었습니다" });
      console.log(savedExamination);
    } else {
      res.json({ state: 1, message: "필수항목을 모두 입력해주세요" });
    }
  } catch (error) {
    console.error(error);
    res.json({ state: 2, message: "서버 오류", error });
  }
}

export const updateExamination = async (req, res) => {
  try {
    const id = req.params.id
    const { title, room, purpose, method, time, caution, result } = req.body;
    const image = req.file?.location; // 이미지가 없을 수도 있음

    const examination = await Examination.findById(id)
    if (!examination) {
      return res.status(404).json({ state: 1, message: "검사안내를 찾을 수 없습니다" })
    }

    const newExamination = { title, room, purpose, method, time, caution, result }
    if (image) newExamination.image = image

    const updatedExamination = await Examination.findByIdAndUpdate(id, updateData, { new: true })
    res.status(200).json({ state: 0, message: "검사안내가 수정되었습니다" })
  } catch (error) {
    console.error(error)
    res.json({ state: 2, message: "서버 오류", error })
  }
}

export const deleteExamination = (req, res)=>{
  try {

  } catch (error) {
    console.log(error)
    res.json({ state: 2, message: "서버 오류", error })
  }
}