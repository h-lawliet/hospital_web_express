import Research from "../models/research.model.js"



export const getResearch = async (req, res) => {
  try {
    const researches = await Research.find() //전체 컬랙션 가져오기
    res.json(researches)
  } catch (error) {
    res.status(500).json({ message: "서버 오류", error });
  }
}

export const createResearch = async (req, res)=>{
  if (req.session.user) {
    try {
      const { year, journal, doi, title, author, url, impact } = req.body
      
      if (year && title && author) {
        const newResearch = new Research({ year, journal, doi, impact, title, author, url })
        const savedResearch = await newResearch.save()
        console.log(savedResearch)
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

export const updateResearch = (req, res) => {

}

export const deleteResearch = (req, res)=>{
  
}