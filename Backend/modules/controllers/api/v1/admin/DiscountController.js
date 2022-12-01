const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class DiscountController extends Controller {
    getAllDiscount(req, res) {
        this.model.Discount.find({}).exec((err, Discount) => {
            if (err) throw err;
            if (Discount) {
                return res.json({
                    data: Discount,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }

    getDiscount(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Discount.findById(req.params.id, (err, Discount) => {
            if (Discount) {
                return res.json({
                    data: Discount,
                    success: true
                })
            }
            res.json({
                data: 'یافت نشد',
                success: false
            })
        })
    }

    registerDiscount(req, res) {
        req.checkBody('discountTitle', 'عنوان تخفیف نمیتواند خالی بماند').notEmpty();
        req.checkBody('discountPercent', ' درصد تخفیف نمیتواند خالی بماند').notEmpty();
        req.checkBody('discountCode', ' کد تخفیف نمیتواند خالی بماند').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        let newDiscount = new this.model.Discount({
            discountTitle:req.body.discountTitle,
            discountPercent:req.body.discountPercent,
            discountCode: req.body.discountCode
        })
        newDiscount.save(err => {
            if (err)  return res.json({
                data: 'خطا',
                success: false
            });
            return res.json({
                data: ' با موفقیت ثبت شد',
                success: true
            });
        })
    }

    updateDiscount(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Discount.findByIdAndUpdate(req.params.id, {
             discountTitle:req.body.discountTitle,
            discountPercent:req.body.discountPercent,
            discountCode: req.body.discountCode
        }, (err, Discount) => {
            if (err) throw err;
            if (Discount) {
                return res.json({
                    data: ' با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }

    deleteDiscount(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Discount.findByIdAndRemove(req.params.id, (err, Discount) => {
            if (err) throw err;
            if (Discount) {
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
}
