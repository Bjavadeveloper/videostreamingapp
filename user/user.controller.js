const UserService = require('./user.service')
const jwt = require('jsonwebtoken')
const mail = require('../CommonService/mailer')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage }).single('file')



exports.register = function (req, res) {
    UserService.createUser(req.body).then(function (result) {
        res.send({
            message: "User Created"
        })
        console.log(result.email)
        // mail.mailer(result.email)
    }, function (error) {
        if (error) {
            res.status(409).send({
                message: "User Already exist"
            })
        } else {
            res.status(500).send()
        }
        console.log("It reached in rejection of controller")
    })
}

exports.login = function (req, res) {
    UserService.findUser(req.body).then(function (result) {
        //creating a jwt
        var payload = {
            email: req.body.email.toLowerCase()
        }
        var token = jwt.sign(payload, "mysecretkey")
        res.setHeader("Authorization", token)
        res.send({
            message: "Login Success",
            response: result
        })
    }, function (error) {
        if (error) {
            res.status(500).send({
                message: "Invalid Credentials"
            })
        }
        else {
            res.status(500).send()
        }
    })
}

exports.deleteAccount = function (req, res) {

}

exports.editAccount = function (req, res) {

}

exports.forgotPassword = (req, res) => {
    UserService.recoverPassword(req.body)
        .once("NOT_FOUND", () => {
            res.status(500).send({
                message: "No Such Email Exists"
            })
        })
        .once("MIl_GAYA", (result) => {
            // console.log("BharathRam");
            mail.responseMail(req.body.email, result.password).then(() => {
                res.send({
                    message: "Password Sent to your Email"
                })
            }).catch(() => {
                res.status(500).send()
            })
        })
        .once("ERROR", () => {
            res.status(500).send()
        })
}

exports.search = (req, res) => {
    console.log("Query is", req.query)
    UserService.findUsers(req.query).then((result) => {
        res.send({
            result
        })
    }).catch(function () {
        res.status(500)
    })
}

exports.uploadProfileImage = (req, res) => {
    console.log('..................control come to uploadImages')
    upload(req, res, (err) => {
        if (err) {
            console.log("..... error in uploading", err)
            res.sendStatus(500);
        }
        console.log("Successfully Completed")
        res.send("Uploaded Successfully");
    });
}
exports.updateUser = (req, res) => {
    UserService.updateProfile(req.body, (error, data) => {
        if (error) {
            res.status(500).send({
                message: "Could not update Profile"
            })
        } else {
            res.status(204).send({
                user: data
            })
        }
    })
}