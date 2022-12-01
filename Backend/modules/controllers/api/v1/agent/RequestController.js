const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class RequestController extends Controller {
    updateRequestVisit(req, res) {
          let listFields={};
          if(req.body.dateVisit){ listFields.dateVisit=req.body.dateVisit}
          if(req.body.timeVisit){ listFields.timeVisit=req.body.timeVisit}
          if(req.body.visited){ listFields.visited=req.body.visited}
          req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
          if (this.showValidationErrors(req, res))
              return;
          this.model.RequestVisit.findByIdAndUpdate(req.params.id,listFields, (err, Result) => {
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

    updateStatusRequestVisit(req, res) {
    console.log(req.body);
    req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
    if (this.showValidationErrors(req, res))
        return;
    this.model.RequestVisit.findByIdAndUpdate(req.params.id, {
         $push: { status: req.body.status } 
        }, (err, result) => {
        if (err) throw err;
        if (result) {
            return res.json({
                data:'پاسخ با موفقیت ثبت شد',
                success: true
            });
        }
        res.status(404).json({
            data: '  وجود ندارد',
            success: false
        });
    });
}


 getAllRequestVisitForAgent(req, res) {
        this.model.RequestVisit.find({agentID:req.params.id}).sort({date:-1})
        .populate({path:'Property User Agent',populate:{path:'PropertyType User SubPropertyType TransactionType Discount'}})
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
    

    getRequestVisit(req, res) {
        this.model.RequestVisit.find({_id:req.params.id}).sort({date:-1})
        .populate({path:'Property User Agent',populate:{path:'PropertyType SubPropertyType TransactionType Discount'}})
        .exec((err, Order) => {
            if (err) throw err;
            if (Order) {
                return res.json({
                    data: Order,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }
    
    //request property
    
       updateStatusRequestProperty(req, res) {
          let listFields={};
          if(req.body.statusRequestProperty){ listFields.statusRequestProperty=req.body.statusRequestProperty}
          req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
          if (this.showValidationErrors(req, res))
              return;
          this.model.RequestProperty.findByIdAndUpdate(req.params.id,listFields, (err, Order) => {
              if (err) throw err;
              if (Order) {
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


  getAllRequestPropertyForAgent(req, res) {
        this.model.RequestProperty.find({agentID:req.params.id}).sort({updatedAt:-1})
        .populate({path: 'User Product'})
        .exec((err, Order) => {
            if (err) throw err;
            if (Order) {
                return res.json({
                    data: Order,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }
  

    getRequestProperty(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.RequestProperty.findById(req.params.id,
            populate({path:'User Product'}),
             (err, Order) => {
            if (Order) {
                return res.json({
                    data: Product,
                    success: true
                })
            }
            res.json({
                data: 'یافت نشد',
                success: false
            })
        })
    }


}
