const Controller = require(`${config.path.controller}/Controller`);
const randomstring = require('randomstring');
module.exports = new class PropertyController extends Controller {
    countPropertyByUser(req, res) {
    this.model.Property.count({userID:req.params.id}).exec((err, Result) => {
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
    registerProperty(req, res) {
        req.checkBody('title', 'وارد کردن فیلد عنوان الزامیست').notEmpty();
        req.checkBody('propertyTypeID', 'وارد کردن کد دسته الزامیست').notEmpty();
        req.checkBody('subPropertyTypeID', 'وارد کردن کد زیر دسته الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
            let newProperty = new this.model.Property({
                code:randomstring.generate({charset: '123456789', length: 6}),
                propertyTypeID:req.body.propertyTypeID,
                userID:req.body.userID,
                subPropertyTypeID:req.body.subPropertyTypeID,
                title:req.body.title,
                discountID:req.body.discountID,
                transactionTypeID:req.body.transactionTypeID,
                agentID:req.body.agentID,
                priceType:req.body.priceType,
                image:req.body.image,
                bedroom:req.body.bedroom,
                gallery:req.body.gallery,
                price:req.body.price,
                age:req.body.age,
                bath:req.body.bath,
                priceRent:req.body.priceRent,
                priceMortgage:req.body.priceMortgage,
                area:req.body.area,
                detail:req.body.detail,
                location:req.body.location,
                features:req.body.features,
                address:req.body.address,
                state:req.body.state,
                city:req.body.city,
                exchange:req.body.exchange,
                condition:req.body.condition,
                vr:req.body.vr,
                date:req.body.date,
                time:req.body.time,
                keywords:req.body.keywords,
                imageDescription:req.body.imageDescription,
                metaDescription:req.body.metaDescription,
            })
            newProperty.save(err => {
            if (err) throw err;
            return res.json({
                data: 'محصول با موفقیت ثبت شد',
                success: true
            });
        })
    }

    updateProperty(req, res) {
        let listFields={};
        if(req.body.userID){ listFields.userID=req.body.userID}
        if(req.body.agentConfirm){ listFields.agentConfirm=req.body.agentConfirm}
        if(req.body.propertyTypeID){ listFields.propertyTypeID=req.body.propertyTypeID}
        if(req.body.subPropertyTypeID){ listFields.subPropertyTypeID=req.body.subPropertyTypeID}
        if(req.body.discountID){ listFields.discountID=req.body.discountID}
        if(req.body.transactionTypeID){ listFields.transactionTypeID=req.body.transactionTypeID}
        if(req.body.agentID){ listFields.agentID=req.body.agentID}
        if(req.body.title){ listFields.title=req.body.title}
        if(req.body.condition){ listFields.condition=req.body.condition}
        if(req.body.detail){ listFields.detail=req.body.detail}
        if(req.body.features){ listFields.features=req.body.features}
        if(req.body.image){ listFields.image=req.body.image}
        if(req.body.bedroom){ listFields.help=req.body.bedroom}
        if(req.body.gallery){ listFields.gallery=req.body.gallery}
        if(req.body.price){ listFields.price=req.body.price}
        if(req.body.bath){ listFields.bath=req.body.bath}
        if(req.body.exchange){ listFields.exchange=req.body.exchange}
        if(req.body.area){ listFields.area=req.body.area}
        if(req.body.priceRent){ listFields.priceRent=req.body.priceRent}
        if(req.body.priceMortgage){ listFields.priceMortgage=req.body.priceMortgage}
        if(req.body.priceType){ listFields.priceType=req.body.priceType}
        if(req.body.vr){ listFields.vr=req.body.vr}
        if(req.body.age){ listFields.age=req.body.age}
        if(req.body.area){ listFields.area=req.body.area}
        if(req.body.keywords){ listFields.keywords=req.body.keywords}
        if(req.body.imageDescription){ listFields.imageDescription=req.body.imageDescription}
        if(req.body.metaDescription){ listFields.metaDescription=req.body.metaDescription}
        if(req.body.active){ listFields.active=req.body.active}
          req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
          if (this.showValidationErrors(req, res))
              return;
          this.model.Property.findByIdAndUpdate(req.params.id,listFields, (err, Product) => {
              if (err) throw err;
              if (Product) {
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

    deleteProperty(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Property.findByIdAndRemove(req.params.id, (err, Result) => {
            if (err) throw err;
            if (Result) {
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

     getAllProperty(req, res) {
        this.model.Property.find().sort({date:-1})
        .populate({path: 'PropertyType SubPropertyType TransactionType Agent User Discount'})
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

    getProperty(req, res) {
        this.model.Property.find({_id:req.params.id}).sort({date:-1})
        .populate({path: 'PropertyType SubPropertyType TransactionType Agent User Discount'})
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
 
    advanceSearchProperty(req, res) {
        let query = {};
        let sort='';
        if (req.body.transactionTypeID) {
            query.transactionTypeID = req.body.transactionTypeID;
        }
        if (req.body.propertyType) {
            query.propertyType = req.body.propertyType;
        }
        if (req.body.subPropertyType) {
            query.subPropertyType = req.body.subPropertyType;
        }
        if (req.body.location) {
            query.location = req.body.location;
        }
        if (req.body.title) {
            query.title = req.body.title;
        }
        if (req.body.priceMin && req.body.priceMax) {
            query.price = {$gte:req.body.priceMin, $lte: req.body.priceMax};
        }
        if (req.body.bedroom) {
            query.bedroom = { $in: req.body.bedroom };
        }
         if (req.body.bath) {
            query.bath = { $in:req.body.bath };
        }
          if (req.body.features) {
          query.features={$eq:req.body.features};
        }
          if (req.body.condition) {
            query.condition = { $eq:req.body.condition };
        }
          if (req.body.exchange) {
            query.exchange = { $eq:req.body.exchange };
        }
        if (req.body.keywords) {
            query.title={$regex:req.body.keywords};
        }
        if (req.body.priceMin && req.body.priceMax) {
            query.price = {$gte:req.body.priceMin, $lte: req.body.priceMax};
        }
        if (req.body.ageMin && req.body.ageMax) {
            query.age = {$gte:req.body.ageMin, $lte: req.body.ageMax};
        }
        if (req.body.areaMin && req.body.areaMax) {
            query.area = {$gte:req.body.areaMin, $lte: req.body.areaMax};
        }
       if (req.body.date) {
        sort={date:req.body.date};
        }
       if (req.body.time) {
        sort={time:req.body.time};
        }
      if (req.body.price) {
        sort={price:req.body.price};
       }
       if (this.showValidationErrors(req, res))
           return;
           console.log(query)
        this.model.Property.find(query).sort(sort)
        .populate({path: 'PropertyType SubPropertyType TransactionType Agent User Discount'})
        .exec((err, Result) => {
            if (err) throw err;
            if (Result) {
                return res.json({
                    data: Result,
                    success: true
                });
            }        
        });
    }

    discountProperty(req, res) {
        this.model.Property.find({ discountStatus: true }).sort({title:-1}).limit(10)
        .populate({path: 'PropertyType SubPropertyType TransactionType Agent User Discount'})
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

    newestProperty(req, res) {
        this.model.Property.find({}).sort({title:-1}).limit(10)
        .populate({path: 'PropertyType SubPropertyType TransactionType Agent User Discount'})
        .exec((err, Result) => {
            if (err)
                res.json({
                    data: 'اطلاعاتی وجود ندارد',
                    success: false
                })
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

   allPropertyBySearch(req, res) {
        this.model.Property.find({title:{$regex:req.body.title}})
        .populate({path: 'PropertyType SubPropertyType TransactionType Agent User Discount'})
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

    allPropertyByPropertyTypeID(req, res) {
        this.model.Property.find({propertyTypeID:req.params.id})
       .populate({path: 'PropertyType SubPropertyType TransactionType Agent User Discount'})
        .exec((err, Result) => {
            if (err)
                res.json({
                    data: 'اطلاعاتی وجود ندارد',
                    success: false
                })
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

    allPropertyBySubPropertyTypeID(req, res) {
        this.model.Property.find({subPropertyTypeID:req.params.id})
        .populate({path: 'PropertyType SubPropertyType TransactionType Agent User Discount'})
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

}

