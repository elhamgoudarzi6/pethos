const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class ContactController extends Controller {
registerContactUs(req, res) {
        req.checkBody('fullName', 'وارد کردن فیلد نام و نام خانوادگی الزامیست').notEmpty();
        req.checkBody('email', 'وارد کردن فیلد ایمیل الزامیست').notEmpty();
        req.checkBody('title', 'وارد کردن فیلدعنوان الزامیست').notEmpty();
        req.checkBody('message', 'وارد کردن فیلد پیغام الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.ContactUs({
            fullName: req.body.fullName,
            email:req.body.email,
            mobile:req.body.mobile,
            title:req.body.title,
            message:req.body.message,
        }).save(err => {
            if (err) {
                throw err;
            }
            return res.json({
                data: ' با موفقیت ثبت  شد',
                success: true
            });
        });
} 




}
