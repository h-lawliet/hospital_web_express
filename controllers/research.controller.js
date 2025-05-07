import Research from "../models/research.model.js"


export const getResearch = async (req, res) => {
  try {
    const researches = await Research.find() //전체 컬랙션 가져오기
    res.json(researches)
  } catch (error) {
    res.status(500).json({ message: "서버 오류", error });
  }
}

export const getResearchDetail = async (req, res) => {
  try {
    const id = req.params.id
    const ResearchData = await Research.findById(id)
    if (!ResearchData) {
      return res.json({ status: 404, message: "해당 id의 논문을 찾을 수 없습니다" })
    }
    res.json({status: 200, content: ResearchData})
  } catch (error) {
    res.json({ status: 500, message: "서버 오류", error })
  }
}

export const createResearch = async (req, res)=>{
  try {
    const { year, journal, doi, title, author, url, impact } = req.body
    
    if (year && title && author && journal) {
      const newResearch = new Research({ year, journal, doi, impact, title, author, url })
      const savedResearch = await newResearch.save()
      console.log("논문 추가 : ", savedResearch)
      res.json({status: 200, message: "논문이 등록되었습니다"})
    } else {
      res.json({status: 400, message: "필수 항목을 모두 입력해주세요"})
    }
  } catch (error) {
    console.log(error)
    res.json({ status: 500, message: "서버 오류", error })
  }
}

export const updateResearch = async (req, res) => {
  try {
    const id = req.params.id
    const { title, year, journal, doi, impact, author, url } = req.body

    const research = await Research.findById(id)
    if (!research) {
      return res.json({ status: 404, message: "해당 id의 논문을 찾을 수 없습니다" })
    }

    if (title && year && journal && author) {
      const newResearch = { title, year, journal, doi, impact, author, url }

      const updatedResearch = await Research.findByIdAndUpdate(id, newResearch, { new: true })
      res.json({ status: 200, message: "논문이 수정되었습니다" })
      console.log("논문 수정 : ", updatedResearch)
    } else {
      res.json({ status: 400, message: "필수항목을 모두 입력해주세요" })
    }
  } catch (error) {
    console.error(error)
    res.json({ status: 500, message: "서버 오류", error })
  }
}

export const deleteResearch = async (req, res)=>{
  const id = req.params.id
  try {
    await Research.findByIdAndDelete(id)
    res.json({ status: 200, message: "논문이 삭제되었습니다" })
  } catch (error) {
    console.log(error)
    res.json({ status: 500, message: "서버 오류", error })
  }
}