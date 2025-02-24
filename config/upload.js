import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3"
import dotenv from "dotenv"

dotenv.config()

const s3 = new S3Client({
  region : 'ap-northeast-2',
  credentials : {
    accessKeyId : process.env.IAM_ACCESSKEY,
    secretAccessKey : process.env.IAM_SECRETKEY
  }
})

export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'hong-hospital-suwon',
    key: function (요청, file, cb) {
      cb(null, Date.now().toString()) //업로드시 파일명 변경가능
    }
  })
})