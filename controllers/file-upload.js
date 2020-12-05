// Mutler
const multer = require('multer')
// Path
const path = require('path')
// File Remove
const fileRemove = require('fs')

const {
  // File Base FOlder Location
  FILE_BASE_FOLDER_LOCATION = path.resolve(__dirname + '/', '../'),
  // Image Folder Location
  IMAGE_FOLDER_LOCATION = FILE_BASE_FOLDER_LOCATION + '/client/public/images/',
  // File Folder Location
  FILE_FOLDER_LOCATION = FILE_BASE_FOLDER_LOCATION + '/client/public/files/'
} = process.env

// storage img
const storageImgFile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, IMAGE_FOLDER_LOCATION)
  },
  filename: (req, file, cb) => {
    // let ext = file.mimetype.split('/')[1]
    cb(null, file.originalname)
    // cb(null, file.originalname + "." + ext)
    // cb(null, new Date().toISOString().replace(/[-T:\.Z]/g, "") + '-' + file.originalname)
    // cb(null, new Date().toISOString().replace(/[-T:\.Z]/g, "") + '-' + file.originalname + "." + ext)
  }
})

// filter img types
const filterImgFile = (req, file, cb) => {
  const fileTypes = ['image/png', 'image/jpg', 'image/jpeg']
  
  if(fileTypes.includes(file.mimetype)) cb(null, true)
  else cb('Only .png .jpg and .jpeg format allowed!', false)
}

// Img FIle Upload Middleware
const uploadImgFile = multer({
  storage: storageImgFile,
  filterImgFile: filterImgFile
  // limits: { fieldSize: 10000000000 }
})

// Img Removing Handler
const handleImgRemove = (res, imgSrc) => {
  fileRemove.unlink(IMAGE_FOLDER_LOCATION + imgSrc, async (err) => {
    if(err) {
      return res.status(500).json({
        success: false,
        error: `Failed at removing file from server images folder`,
        data: err
      })
    }
  })
}

module.exports = {
  imgFolderLocation: IMAGE_FOLDER_LOCATION,
  fileFolderLocation: FILE_FOLDER_LOCATION,
  uploadImgFile,
  handleImgRemove,
}