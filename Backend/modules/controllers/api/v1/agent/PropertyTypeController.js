const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class PropertyTypeController extends Controller {
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
    
    getAllPropertyType(req, res) {
        this.model.PropertyType.find()
            .populate({ path: 'SubPropertyType'})
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

    getAllSubPropertyType(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.SubPropertyType.find({ propertyTypeID: req.params.id }).exec((err, Result) => {
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
    
        getAllSubPropertyType(req, res) {
        this.model.SubPropertyType.find().exec((err, Result) => {
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
  
    getAllFeature(req, res) {
        if (this.showValidationErrors(req, res))
            return;
        this.model.Feature.find({}).exec((err, Result) => {
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
    
    getAllTransactionType(req, res) {
        if (this.showValidationErrors(req, res))
            return;
        this.model.TransactionType.find({}).exec((err, Result) => {
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
    
        getAllExchange(req, res) {
        if (this.showValidationErrors(req, res))
            return;
        this.model.Exchange.find({}).exec((err, Result) => {
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
    
         getAllCondition(req, res) {
        if (this.showValidationErrors(req, res))
            return;
        this.model.Condition.find({}).exec((err, Result) => {
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
    searchParentSubPropertyType(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.SubPropertyType.findById(req.params.id, (err, Result) => {
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
        })
    }
    
}
