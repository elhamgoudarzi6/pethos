const multer  = require('multer')
const mkdirp  = require('mkdirp');
const randomstring  = require('randomstring');
const util = require("util");


const ImageStorage = multer.diskStorage({
    destination : (req , file , cb) => {
        let dir = `./public/uploads`;
        mkdirp(dir , err => cb(err , dir))
    },
    filename: (req , file , cb) => {
        cb(null, randomstring.generate({charset:'pethosapp',length:4}) +  '-' + file.originalname )
    }
});
const imageFilter = (req , file , cb) => {
    if(file.mimetype === "image/png" || file.mimetype === "image/jpeg" ||file.mimetype === "image/jpg" || file.mimetype === "image/gif" || file.mimetype === "application/pdf" || file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        cb(null , true)
    } else {
        cb(null , false)
    }
}

const uploadImage = multer({
    storage : ImageStorage,
    limits : {
        fileSize : 2048 * 2048 * 30
    },
    fileFilter : imageFilter
});


///////video
const VideoStorage = multer.diskStorage({
    destination : (req , file , cb) => {
        let dir = `./public/uploads/videos`;
        mkdirp(dir , err => cb(err , dir))
    },
    filename: (req , file , cb) => {
        cb(null, randomstring.generate({charset:'pethosapp',length:5}) +  '-' + file.originalname )
    }
});

const videoFilter = (req , file , cb) => {
    if(file.mimetype === "video/mp4" || file.mimetype === "video/ogg") {
        cb(null , true)
    } else {
        cb(null , false)
    }
}

const uploadVideo = multer({
    storage : VideoStorage,
    limits : {
        fileSize : 1024 * 1024 * 10
    },
    fileFilter : videoFilter
});
var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(`${__dirname}/public`));
    },
    filename: (req, file, callback) => {
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            var message = `${file.originalname} is invalid. Only accept png/jpeg.`;
            return callback(message, null);
        }

        var filename = `${Date.now()}-bezkoder-${file.originalname}`;
        callback(null, filename);
    }
});

var uploadFiles = multer({ storage: ImageStorage }).array("files", 20);
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = {
    uploadImage ,uploadVideo,uploadFiles
}
