const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class RequestController extends Controller {
    registerRequestProperty(req, res) {
        req.checkBody('userID', 'وارد کردن فیلد آیدی کاربر الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
          let listFields={};
          if(req.body.userID){ listFields.userID=req.body.userID}
          if(req.body.transactionTypeID){ listFields.transactionTypeID=req.body.transactionTypeID}
          if(req.body.propertyTypeID){ listFields.propertyTypeID=req.body.propertyTypeID}
          if(req.body.subPropertyTypeID){ listFields.subPropertyTypeID=req.body.subPropertyTypeID}
          if(req.body.location){ listFields.location=req.body.location}
          if(req.body.features){ listFields.features=req.body.features}
          if(req.body.priceMin){ listFields.priceMin=req.body.priceMin}
          if(req.body.priceMax){ listFields.priceMax=req.body.priceMax}
          if(req.body.bedroom){ listFields.bedroom=req.body.bedroom}
          if(req.body.bath){ listFields.bath=req.body.bath}
          if(req.body.condition){ listFields.condition=req.body.condition}
          if(req.body.exchange){ listFields.exchange=req.body.exchange}
          if(req.body.keywords){ listFields.keywords=req.body.keywords}
          if(req.body.ageMin){ listFields.ageMin=req.body.ageMin}
          if(req.body.ageMax){ listFields.ageMax=req.body.ageMax}
          if(req.body.areaMin){ listFields.areaMin=req.body.areaMin}
          if(req.body.areaMax){ listFields.areaMax=req.body.areaMax}
          if(req.body.priceType){ listFields.priceType=req.body.priceType}
          if(req.body.priceRentMax){ listFields.priceRentMax=req.body.priceRentMax}
          if(req.body.priceRentMin){ listFields.priceRentMin=req.body.priceRentMin}
          if(req.body.priceMortgageMax){ listFields.priceMortgageMax=req.body.priceMortgageMax}
          if(req.body.priceMortgageMin){ listFields.priceMortgageMin=req.body.priceMortgageMin}
          if(req.body.state){ listFields.state=req.body.state}
          if(req.body.priority){ listFields.priority=req.body.priority}
          if(req.body.city){ listFields.city=req.body.city}
          if(req.body.date){ listFields.date=req.body.date}
          if(req.body.time){ listFields.time=req.body.time}
            let newOrder = new this.model.RequestProperty({
              listFields
            })
            newOrder.save(err => {
            if (err) throw err;
            return res.json({
                data: 'سفارش با موفقیت ثبت شد',
                success: true
            });
        })
    }
    
   

    updateRequestProperty(req, res) {
          let listFields={};
          if(req.body.userID){ listFields.userID=req.body.userID}
          if(req.body.count){ listFields.count=req.body.count}
          if(req.body.date){ listFields.date=req.body.date}
          if(req.body.discountCode){ listFields.discountCode=req.body.discountCode}
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

    deleteRequestProperty(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.RequestProperty.findByIdAndRemove(req.params.id, (err, Order) => {
            if (err) throw err;
            if (Order) {
                return res.json({
                    data: 'محصول با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین محصولی وجود ندارد',
                success: false
            });
        });
    }

    getAllRequestPropertyByUser(req, res) {
        this.model.RequestProperty.find({userID:req.params.id}).sort({updatedAt:-1})
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
        this.model.RequestProperty.find({_id:req.params.id}).sort({updatedAt:-1})
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
    
    //request visit
       registerRequestVisit(req, res) {
        if (this.showValidationErrors(req, res))
            return;
              this.model.RequestVisit.findOne({userID: req.body.userID,propertyID:req.body.propertyID,agentID:req.body.agentID}, (err, Result) => {
            if (err)  return res.json({
                data: err,
                success: false
            });
            if (Result == null) {
            let newRequestVisit = new this.model.RequestVisit({
                userID:req.body.userID,
                propertyID:req.body.propertyID,
                agentID:req.body.agentID,
                date:req.body.date,
                time:req.body.time,
                status:req.body.status,
            })
            newRequestVisit.save(err => {
            if (err) throw err;
            return res.json({
                data: ' با موفقیت ثبت شد',
                success: true});
            })
            }
            else
                return res.json({
                    data: 'درخواست شما ثبت شده در پنل کاربری منتظر نتیجه درخواست باشید',
                    success: false
                });
    })
    }

    deleteRequestVisit(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.RequestVisit.findByIdAndRemove(req.params.id, (err, Order) => {
            if (err) throw err;
            if (Order) {
                return res.json({
                    data: ' با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'وجود ندارد',
                success: false
            });
        });
    }

    getAllRequestVisitByUser(req, res) {
        this.model.RequestVisit.find({userID:req.params.id}).sort({date:-1})
        .populate({path:'Property User Agent',populate:{path:'PropertyType User SubPropertyType TransactionType Discount'}})
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

}
