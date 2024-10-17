import multer from 'multer'
import { GridFsStorage } from 'multer-gridfs-storage'

const storage = new GridFsStorage({
  url: 'mongodb://localhost:27018/drcdv',
  file: (req, file) => {
    return {
      filename: `${Date.now()}-${file.originalname}`,
      bucketName: 'uploads', // Bucket name should match collection name
    }
  },
})

export const upload = multer({ storage })
