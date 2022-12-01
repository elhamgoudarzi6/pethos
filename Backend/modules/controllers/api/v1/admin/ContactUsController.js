const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class ContactController extends Controller {

    getAllContactUs(req, res) {
        this.model.ContactUs.find({}).exec((err, ContactUs) => {
            if (err) throw err;
            if (ContactUs) {
                return res.json({
                    data: ContactUs,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }

    deleteContactUs(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.ContactUs.findByIdAndRemove(req.params.id, (err, ContactUs) => {
            if (err) throw err;
            if (ContactUs) {
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

    getContactUs(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.ContactUs.findById(req.params.id, (err, ContactUs) => {
            if (ContactUs) {
                return res.json({
                    data: ContactUs,
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
