const Controller = require(`${config.path.controller}/Controller`);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = new class AuthController extends Controller {
       getAgentRating(req, res) {
        if (this.showValidationErrors(req, res))
            return;
        this.model.AgentRating.find({agentID:req.params.id}).exec((err, rating) => {
            if (err) throw err;
            if (rating) {
                let sum=0;
                let count=rating.length;
                for (let i=0;i<=count-1;i++){
                    sum+=rating[i].rating;
                }
                return res.json({
                    data: sum/count,
                    success: true
                });
            }
            res.json({
                data: 'هیچ اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }
      getToken(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        if(req.body.SecretKey == config.secret){
        this.model.Agent.findById(req.params.id, (err, Result) => {
            if (Result) {
                return res.json({
                    token: Result.token,
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
    
    findMobile(req, res) {
    req.checkBody('mobile', ' فیلد موبایل نمی تواند خالی بماند').notEmpty();
    this.model.Agent.findOne({ mobile: req.body.mobile }, (err, Result) => {
        if (err) throw err;
        if (Result) {
                    return res.json({ data: 'این شماره قبلا ثبت شده است', success: true });
            }
            
    return res.json({ data: 'یافت نشد', success: false })
    });
}
     loginAgent(req , res) {
        req.checkBody('userName' , 'وارد کردن فیلد نام کاربری الزامیست').notEmpty();
        req.checkBody('password' , 'وارد کردن فیلد پسورد الزامیست').notEmpty();
        if(this.showValidationErrors(req, res))
            return;
        this.model.Agent.findOne({ userName : req.body.userName } , (err , Result) => {
                if(err) throw err;
            if(Result == null)
                return res.status(422).json({
                    data : 'اطلاعات وارد شده صحیح نیست',
                    success : false
                });
            bcrypt.compare(req.body.password , Result.password , (err , status) => {
                if(! status)
                    return res.status(422).json({
                        success : false,
                        data : 'پسورد وارد شده صحیح نمی باشد'
                    })
                 let token = jwt.sign({ user_id: Result._id }, config.secret, { expiresIn: '110h', });
                 this.model.Agent.findByIdAndUpdate(Result.id, { token: token }, (err, result) => {
                    if (err) throw err
                    this.model.Agent.findById(result.id,{ token: 1, userName: 1,type:1,image:1,fullName:1 }, (err, auth) => {
                        return res.json({ data: auth, success: true });
                    });
                });
            })
        })

    }
    
    
  updateAgent(req, res) {
        let listFields={};
        if(req.body.pethosID){ listFields.pethosID=req.body.pethosID}
        if(req.body.subPropertyTypeID){ listFields.subPropertyTypeID=req.body.subPropertyTypeID}
        if(req.body.fullName){ listFields.fullName=req.body.fullName}
        if(req.body.image){ listFields.image=req.body.image}
        if(req.body.mobile){ listFields.mobile=req.body.mobile}
        if(req.body.levelID){ listFields.levelID=req.body.levelID}
        if(req.body.info){ listFields.info=req.body.info}
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
          if (this.showValidationErrors(req, res))
              return;
          this.model.Agent.findByIdAndUpdate(req.params.id,listFields, (err, Result) => {
              if (err) throw err;
              if (Result) {
                  return res.json({
                      data: 'اطلاعات  با موفقیت بروز رسانی شد',
                      success: true
                  });
              }
              res.status(404).json({
                  data: 'چنین اطلاعاتی وجود ندارد',
                  success: false
              });
  
          });
    }

    getAgent(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Agent.findById(req.params.id).populate('SubPropertyType AgentLevel Pethos SubPethos SubSubPethos').exec((err, Result) => {
            if (err) throw err;
            if (Result) {
                return res.json({
                    data: Result,
                    success: true
                })
            }
            res.json({
                data: 'یافت نشد',
                success: false
            })
        });
    }
    
       changeUsername(req,res){
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        req.checkBody('userName', 'وارد کردن فیلد نام کاربری الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Agent.findByIdAndUpdate(req.params.id, {
            userName: req.body.userName,
        }, (err, Result) => {
            if (err) throw err;
            if (Result) {
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
        this.model.Agent.findOneAndUpdate({userName: req.body.userName}, {password: hash}, (err, Result) => {
            if (err) throw err;
            if (Result) {
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
        this.model.Agent.findByIdAndUpdate(req.params.id, {
            password: hash,
        }, (err, Result) => {
            if (err) throw err;
            if (Result) {
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
    
       changeMobileNumber(req,res){
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        req.checkBody('mobile', 'وارد کردن فیلد شماره همراه الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Agent.findByIdAndUpdate(req.params.id, {
            mobile: req.body.mobile,
        }, (err, Result) => {
            if (err) throw err;
            if (Result) {
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
    
 
}
