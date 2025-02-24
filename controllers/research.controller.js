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
    res.json(ResearchData)
  } catch (error) {
    res.status(500).json({ message: "서버 오류", error });
  }
}

export const createResearch = async (req, res)=>{
  if (req.session.user) {
    try {
      const { year, journal, doi, title, author, url, impact } = req.body
      
      if (year && title && author && journal) {
        const newResearch = new Research({ year, journal, doi, impact, title, author, url })
        const savedResearch = await newResearch.save()
        console.log("논문 추가 : ", savedResearch)
        res.status(200).json({state: 0, message: "논문이 등록되었습니다"})
      } else {
        res.json({state: 1, message: "필수 항목을 모두 입력해주세요"})
      }
    } catch (error) {
      console.log(error)
      res.json({ state: 2, message: "서버 오류", error })
    }
  } else {
    res.json({ state: 3, message: "로그인 후 이용해주세요" })
  }
}

export const updateResearch = async (req, res) => {
  try {
    const id = req.params.id
    const { title, year, journal, doi, impact, author, url } = req.body;

    const research = await Research.findById(id)
    if (!research) {
      return res.status(404).json({ state: 1, message: "해당 id의 논문을 찾을 수 없습니다" })
    }

    if (title && year && journal && author) {
      const newResearch = { title, year, journal, doi, impact, author, url }

      const updatedResearch = await Research.findByIdAndUpdate(id, newResearch, { new: true })
      res.status(200).json({ state: 0, message: "논문이 수정되었습니다" })
      console.log("논문 수정 : ", updatedResearch)
    } else {
      res.json({ state: 1, message: "필수항목을 모두 입력해주세요" })
    }
  } catch (error) {
    console.error(error)
    res.json({ state: 2, message: "서버 오류", error })
  }
}

export const deleteResearch = async (req, res)=>{
  try {
    const id = req.params.id
    await Research.findByIdAndDelete(id)
    res.status(200).json({ state: 0, message: "논문이 삭제되었습니다" })
  } catch (error) {
    console.log(error)
    res.json({ state: 2, message: "서버 오류", error })
  }
}