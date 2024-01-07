const Controller = require(`${config.path.controller}/Controller`);
const bcrypt = require('bcrypt');
const randomstring  = require('randomstring');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
module.exports = new class AuthUserController extends Controller {
    getUser(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.User.findById(req.params.id,{token:0}, (err, User) => {
            if (User) {
                return res.json({
                    data: User,
                    success: true
                })
            }
            res.json({
                data: 'یافت نشد',
                success: false
            })
        })
    }
    
       getToken(req, res) {
         req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        if(req.body.SecretKey == config.secret){
        this.model.User.findById(req.params.id, (err, User) => {
            if (User) {
                return res.json({
                    token: User.token,
                    success: true
                })
            }
            res.json({
                data: 'یافت نشد',
                success: false
            })
        })
        }
        else{
     return res.status(403).json({
        data: 'No SecretKey Provided',
        success: false
    })
        }
 
    }
    
    
authUser(req, res) {
    req.checkBody('mobile', ' فیلد موبایل نمی تواند خالی بماند').notEmpty();
    this.model.User.findOne({ mobile: req.body.mobile }, (err, User) => {
        if (err) throw err;
        if (User) {
            let token = jwt.sign({ user_id: User._id }, config.secret, { expiresIn: '110h', });
            this.model.User.findByIdAndUpdate(User.id, { token: token }, (err, result) => {
                if (err) throw err
                    this.model.User.findById(result.id,{ token: 1, mobile: 1,type:1,image:1,fullName:1 }, (err, auth) => {
                    return res.json({ data: auth, success: true });
                });
            });
        } else {
            let newUser = new this.model.User({ mobile: req.body.mobile });
            newUser.save(err => {
                if (err) throw err;
                let token = jwt.sign({ user_id: newUser._id }, config.secret, { expiresIn: '110h', });
                this.model.User.findByIdAndUpdate(newUser.id, { token: token }, (err, result) => {
                    if (err) throw err
                    this.model.User.findById(result.id,{ token: 1, mobile: 1,type:1,image:1,fullName:1 }, (err, auth) => {
                        return res.json({ data: auth, success: true });
                    });
                });
            });
        }
    });
}

    updateUser(req, res) {
        let listFields={};
        if(req.body.fullName){ listFields.fullName=req.body.fullName}
        if(req.body.birthDate){ listFields.birthDate=req.body.birthDate}
        if(req.body.rating){ listFields.rating=req.body.rating}
        if(req.body.walletValue){ listFields.walletValue=req.body.walletValue}
        if(req.body.image){ listFields.image=req.body.image}
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.User.findByIdAndUpdate(req.params.id,listFields, (err, User) => {
            if (err) throw err;
            if (User) {
                return res.json({
                    data: 'اطلاعات کاربر با موفقیت بروز رسانی شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین کاربری وجود ندارد',
                success: false
            });

        });
    }

    deleteUser(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.User.findByIdAndRemove(req.params.id, (err, User) => {
            if (err) throw err;
            if (User) {
                return res.json({
                    data: ' با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین کاربری وجود ندارد',
                success: false
            });
        });
    }

 
    changeMobileNumber(req,res){
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        req.checkBody('mobile', 'وارد کردن فیلد شماره همراه الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.User.findByIdAndUpdate(req.params.id, {
            mobile: req.body.mobile,
        }, (err, User) => {
            if (err) throw err;
            if (User) {
                return res.json({
                    data: 'شماره همراه با موفقیت تغییر یافت',
                    success: true
                });
            }
    res.status(404).json({
        data: 'چنین کاربری وجود ندارد',
        success: false
    });
});
}


findMobile(req, res) {
    req.checkBody('mobile', ' فیلد موبایل نمی تواند خالی بماند').notEmpty();
    this.model.User.findOne({ mobile: req.body.mobile }, (err, User) => {
        if (err) throw err;
        if (User) {
                    return res.json({ data: 'این شماره قبلا ثبت شده است', success: true });
            }
            
    return res.json({ data: 'یافت نشد', success: false })
    });
}






}
