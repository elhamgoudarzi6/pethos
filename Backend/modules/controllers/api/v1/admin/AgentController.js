const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class AgentController extends Controller {
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
    registerPethos(req, res) {
        if (this.showValidationErrors(req, res))
            return;
        this.model.Pethos({
            title: req.body.title,
            image: req.body.image,
        }).save(err => {
            if (err) {
                throw err;
            }
            return res.json({
                data: 'ثبت  شد',
                success: true
            });
        });
    }
    
     getAllPethos(req, res) {
        this.model.Pethos.find()
        .populate({path: 'SubPethos',populate:{path: 'SubSubPethos'}})
        .exec((err, Result) => {
                if (err) throw err;
                if (Result) {
                    return res.json({
                        data: Result,
                        success: true
                    });
                }
                res.json({
                    data: 'اطلاعاتی وجود ندارد',
                    success: false
                })
            });
    }
    
    registerSubPethos(req, res) {
        if (this.showValidationErrors(req, res))
            return;
        this.model.SubPethos({
            pethosID:req.body.pethosID,
            title: req.body.title,
            image: req.body.image,
        }).save(err => {
            if (err) {
                throw err;
            }
            return res.json({
                data: 'ثبت  شد',
                success: true
            });
        });
    }
    
     getAllSubPethos(req, res) {
        this.model.SubPethos.find({pethosID: req.params.id }).exec((err, Result) => {
                if (err) throw err;
                if (Result) {
                    return res.json({
                        data: Result,
                        success: true
                    });
                }
                res.json({
                    data: 'اطلاعاتی وجود ندارد',
                    success: false
                })
            });
    }
    
    registerSubSubPethos(req, res) {
        if (this.showValidationErrors(req, res))
            return;
        this.model.SubSubPethos({
            subPethosID:req.body.subPethosID,
            title: req.body.title,
            image: req.body.image,
        }).save(err => {
            if (err) {
                throw err;
            }
            return res.json({
                data: 'ثبت  شد',
                success: true
            });
        });
    }
    
     getAllSubSubPethos(req, res) {
        this.model.SubPethos.find({subPethosID: req.params.id }).exec((err, Result) => {
                if (err) throw err;
                if (Result) {
                    return res.json({
                        data: Result,
                        success: true
                    });
                }
                res.json({
                    data: 'اطلاعاتی وجود ندارد',
                    success: false
                })
            });
    }
    
    registerAgentLevel(req, res) {
        if (this.showValidationErrors(req, res))
            return;
        this.model.AgentLevel({
            min: req.body.min,
            max: req.body.max,
            level: req.body.level,
        }).save(err => {
            if (err) {
                throw err;
            }
            return res.json({
                data: 'ثبت  شد',
                success: true
            });
        });
    }
    
    getAllAgentLevel(req, res) {
        this.model.AgentLevel.find().exec((err, Result) => {
                if (err) throw err;
                if (Result) {
                    return res.json({
                        data: Result,
                        success: true
                    });
                }
                res.json({
                    data: 'اطلاعاتی وجود ندارد',
                    success: false
                })
            });
    }
    
    registerAgent(req, res) {
        if (this.showValidationErrors(req, res))
            return;
        this.model.Agent({
            pethosID: req.body.pethosID,
            subPropertyTypeID: req.body.subPropertyTypeID,
            fullName: req.body.fullName,
            image: req.body.image,
            info: req.body.info,
            mobile: req.body.mobile,
            levelID: req.body.levelID,
            password:req.body.mobile,
            userName:req.body.mobile
        }).save(err => {
            if (err) {
                throw err;
            }
            return res.json({
                data: 'ثبت  شد',
                success: true
            });
        });
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

    deleteAgent(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Agent.findByIdAndRemove(req.params.id, (err, Result) => {
            if (err) throw err;
            if (Result) {
                return res.json({
                    data: 'دسته سطح یک با موفقیت حذف شد',
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
    
    getAllAgent(req, res) {
        this.model.Agent.find()
            .populate('SubPropertyType AgentLevel Pethos SubPethos SubSubPethos')
            .exec((err, Result) => {
                if (err) throw err;
                if (Result) {
                    return res.json({
                        data: Result,
                        success: true
                    });
                }
                res.json({
                    data: 'اطلاعاتی وجود ندارد',
                    success: false
                })
            });
    }
    
     getAllAgentByCategoryID(req, res) {
        this.model.Agent.find({subPropertyTypeID:req.params.id})
        .populate({path:'SubPropertyType'})
        .exec((err, SubPropertyType) => {
            if (err) throw err;
            if (SubPropertyType) {
                return res.json({
                    data: SubPropertyType,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }
}
