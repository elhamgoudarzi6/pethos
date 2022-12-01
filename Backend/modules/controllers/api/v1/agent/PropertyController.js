const Controller = require(`${config.path.controller}/Controller`);
const randomstring = require('randomstring');
module.exports = new class PropertyController extends Controller {
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
   getAllPropertyForAgent(req, res) {
        this.model.Property.find({agentID:req.params.id}).sort({date:-1})
        .populate({path: 'PropertyType SubPropertyType TransactionType Agent User Discount',populate:{path:'User'}})
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
    countPropertyForAgent(req, res) {
    req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
    if (this.showValidationErrors(req, res))
        return;
    this.model.Property.count({agentID:req.params.id}).exec((err, Result) => {
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
}