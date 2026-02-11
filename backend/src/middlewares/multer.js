// import multer from 'multer';

// const storage = multer.diskStorage({
//     destination: (req, file, cb)=>{
//         cb(null, '../public');
//     },
//     filename: (req, file, cb)=>{
//         cb(null, file.originalname);
//     }
// });


// const upload = multer({storage: storage});
// export default upload;

import multer from "multer";
import fs from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "uploads");


if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
export default upload;
