const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class UserController extends Controller {
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

    getAllUser(req, res) {
        this.model.User.find({},{token:0} ,(err, User) => {
            if (User) {
                return res.json({
                    data: User,
                    success: true
                })
            }
            res.json({
                data: 'کاربر یافت نشد',
                success: false
            })
        })
    }
    
    updateUser(req, res) {
        let listFields={};
       if(req.body.fullName){ listFields.fullName=req.body.fullName}
        if(req.body.birthDate){ listFields.birthDate=req.body.birthDate}
        if(req.body.rating){ listFields.rating=req.body.rating}
        if(req.body.walletValue){ listFields.walletValue=req.body.walletValue}
        if(req.body.level){ listFields.level=req.body.level}
        if(req.body.image){ listFields.image=req.body.image}
        if(req.body.mobile){ listFields.mobile=req.body.mobile}
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
                    data: 'کاربر با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }

registerUser(req, res) {
    req.checkBody('mobile', ' فیلد موبایل نمی تواند خالی بماند').notEmpty();
    this.model.User.findOne({ mobile: req.body.mobile }, (err, User) => {
        if (err) throw err;
        if (User) {
           return res.json({ data:'این شماره قبلا ثبت شده است', success: false});
        } else {
            let newUser = new this.model.User({
               mobile: req.body.mobile,
               fullName:req.body.fullName,
               birthDate:req.body.birthDate,
               image:req.body.image,
            });
            newUser.save(err => {
                if (err) throw err;
                    return res.json({ data: newUser, success: true });
            });
        }
    });
}


}
