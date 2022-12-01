const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class AgentController extends Controller {
    registerAgentRating(req, res) {
       if (this.showValidationErrors(req, res))
            return;
    this.model.AgentRating.findOne({userID: req.body.userID,agentID: req.body.agentID}, (err, User) => {
          if (err) throw err;
        if (User) {
               return res.json({
                data: 'شما قبلا امتیاز برای این مشاور ثبت کرده اید',
                success: false
            });
        } else {
        this.model.AgentRating({
            userID: req.body.userID,
            agentID: req.body.agentID,
            rating: req.body.rating,
        }).save(err => {
            if (err) {
                throw err;
            }
            return res.json({
                data: 'امتیاز ثبت شد',
                success: true
            });
        });
    }
    });
    }
    
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
    
    getAgent(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Agent.findById(req.params.id)
        .populate('SubPropertyType AgentLevel Pethos SubPethos SubSubPethos')
        .exec((err, Result) => {
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
            .populate({path:'SubPropertyType'})
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
    
      getAllCategoryAgent(req, res) {
        this.model.SubPropertyType.find({}).exec((err, SubPropertyType) => {
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
