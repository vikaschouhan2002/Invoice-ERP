import multer from "multer";

var storage = multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

export const adminProfile = multer({
    storage:storage
}).single('adminProfile');

export const companyLogo = multer({
    storage:storage
}).single('companyLogo');
