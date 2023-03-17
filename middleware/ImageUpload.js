import multer, { diskStorage } from 'multer';
import path from 'path';

const multerStorage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `/Products/PRD${new Date().getTime()}.${ext}`);
    },

});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "jpg", "jpeg", "png", "webp") {
        cb(null, true);
    } else {
        cb(new Error("Not a jpg/jpeg/png File!!"), false);
    }
};
const ImageUpload = multer({ storage: multerStorage, fileFilter: multerFilter, limits: { fileSize: 100000 } }, ).single('img');

export default { ImageUpload };