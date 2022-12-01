const Controller = require(`${config.path.controller}/Controller`);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = new class AuthController extends Controller {
     getToken(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        if(req.body.SecretKey == config.secret){
        this.model.Admin.findById(req.params.id, (err, Admin) => {
            if (Admin) {
                return res.json({
                    token: Admin.token,
                    success: true
                })
            }
            res.json({
                data: 'یافت نشد',
                success: false }) 
            
        })
        }
        else{
            res.json({
                data: 'SecretKey not found',
                success: false
            })
        }
    }
    
         getAdmin(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Admin.findById(req.params.id, (err, Admin) => {
            if (Admin) {
                return res.json({
                    data: Admin,
                    success: true
                })
            }
            res.json({
                data: 'یافت نشد',
                success: false
            })
        })
    }
    
    registerAdmin(req, res) {
        req.checkBody('userName', 'وارد کردن فیلد نام کاربری الزامیست').notEmpty();
        req.checkBody('password', 'وارد کردن فیلد رمز عبور الزامیست').notEmpty();
        req.checkBody('fullName', 'وارد کردن فیلد نام الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Admin.findOne({userName: req.body.userName}, (err, Admin) => {
            if (err) throw err;
            if (Admin) {
                return res.json({
                    data: 'این نام کاربری قبلا ثبت شده است',
                    success: false
                });
            } else {
                this.model.Admin({
                    userName: req.body.userName,
                    password: req.body.password,
                    fullName: req.body.fullName,
                    image: req.body.image,
                    accessLevel:req.body.accessLevel,
                }).save(err => {
                    if (err) {
                        throw err;
                    }
                    return res.json({
                        data: 'ادمین با موفقیت ثبت  شد',
                        success: true
                    });
                })
            }
        })
    }

   loginAdmin(req , res) {
        req.checkBody('userName' , 'وارد کردن فیلد نام کاربری الزامیست').notEmpty();
        req.checkBody('password' , 'وارد کردن فیلد پسورد الزامیست').notEmpty();
        if(this.showValidationErrors(req, res))
            return;
        this.model.Admin.findOne({ userName : req.body.userName } , (err , Admin) => {
                if(err) throw err;
            if(Admin == null)
                return res.status(422).json({
                    data : 'اطلاعات وارد شده صحیح نیست',
                    success : false
                });
            bcrypt.compare(req.body.password , Admin.password , (err , status) => {
                if(! status)
                    return res.status(422).json({
                        success : false,
                        data : 'پسورد وارد شده صحیح نمی باشد'
                    })
                 let token = jwt.sign({ user_id: Admin._id }, config.secret, { expiresIn: '110h', });
                 this.model.Admin.findByIdAndUpdate(Admin.id, { token: token }, (err, result) => {
                    if (err) throw err
                    this.model.Admin.findById(result.id,{ token: 1, userName: 1,type:1,image:1,fullName:1 }, (err, auth) => {
                        return res.json({ data: auth, success: true });
                    });
                });
            })
        })

    }
    
   

    updateAdmin(req, res) {
        let listFields={};
        if(req.body.userName){ listFields.userName=req.body.userName}
        if(req.body.password){ listFields.password=bcrypt.hashSync(req.body.password, 10)}
        if(req.body.fullName){ listFields.fullName=req.body.fullName}
        if(req.body.image){ listFields.image=req.body.image}
        if(req.body.accessLevel){ listFields.accessLevel=req.body.accessLevel}
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Admin.findByIdAndUpdate(req.params.id, listFields, (err, Admin) => {
            if (err) throw err;
            if (Admin) {
                return res.json({
                    data: 'با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین ادمینی وجود ندارد',
                success: false
            });
        });
    }

    getAllAdmin(req, res) {
        this.model.Admin.find({},{token:0}).exec((err, Admin) => {
            if (err) throw err;
            if (Admin) {
                return res.json({
                    data: Admin,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }
    
    deleteAdmin(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Admin.findByIdAndRemove(req.params.id, (err, Admin) => {
            if (err) throw err;
            if (Admin) {
                return res.json({
                    data: ' با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }
    
    changeUsername(req,res){
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        req.checkBody('userName', 'وارد کردن فیلد نام کاربری الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Admin.findByIdAndUpdate(req.params.id, {
            userName: req.body.userName,
        }, (err, User) => {
            if (err) throw err;
            if (User) {
                return res.json({
                    data: 'با موفقیت تغییر یافت',
                    success: true
                });
            }
    res.status(404).json({
        data: 'چنین  اطلاعاتی وجود ندارد',
        success: false
    });
});
}

    resetPassword(req, res) {
        let newpassword = randomstring.generate({charset: '123456789', length: 8});
        let hash = bcrypt.hashSync(newpassword, 10);
        req.checkBody('mobile', 'وارد کردن فیلد موبایل الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Admin.findOneAndUpdate({userName: req.body.userName}, {password: hash}, (err, Admin) => {
            if (err) throw err;
            if (Admin) {
                return res.json({
                    data: 'اطلاعات با موفقیت آپدیت شد',
                    newpass: newpassword,
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }
    
    changePassword(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        req.checkBody('password', 'وارد کردن فیلد پسورد الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        let hash = bcrypt.hashSync(req.body.password, 10);
        this.model.Admin.findByIdAndUpdate(req.params.id, {
            password: hash,
        }, (err, Admin) => {
            if (err) throw err;
            if (Admin) {
                return res.json({
                    data: 'رمز عبور با موفقیت تغییر یافت',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین کاربری وجود ندارد',
                success: false
            });
        });
    }
    
    
}
