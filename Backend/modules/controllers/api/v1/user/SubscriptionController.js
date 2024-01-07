const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class SubscriptionController extends Controller {
    registerSubscription(req, res) {
        req.checkBody('mobile', 'وارد کردن فیلد موبایل الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Subscription.findOne({mobile: req.body.mobile}, (err, result) => {
            if (err)  return res.json({
                data: err,
                success: false
            });
            if (result == null) {
                this.model.Subscription({
                    mobile: req.body.mobile,
                }).save(err => {
                    if (err) {
                        throw err;
                    }
                    return res.json({
                        data: 'شماره با موفقیت ثبت  شد',
                        success: true
                    });
                })
            }
            else
                return res.json({
                    data: ' این شماره همراه قبلاً ثبت  شده است',
                    success: false
                });
    })
    }


}
