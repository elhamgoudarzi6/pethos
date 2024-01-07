const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class SliderController extends Controller {
    getAllSlider(req, res) {
        this.model.Slider.find({}).sort({ tag: -1 }).exec((err, slider) => {
            if (err) throw err;
            if (slider) {
                return res.json({
                    data: slider,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }

    getSlider(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Slider.findById(req.params.id, (err, slider) => {
            if (slider) {
                return res.json({
                    data: slider,
                    success: true
                })
            }
            res.json({
                data: 'یافت نشد',
                success: false
            })
        })
    }

    registerSlider(req, res) {
        req.checkBody('tag', ' تگ اسلایدر نمیتواند خالی بماند').notEmpty();
        req.checkBody('link', ' لینک اسلایدر نمیتواند خالی بماند').notEmpty();
        req.checkBody('imageurl', ' تصویر نمیتواند خالی بماند').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        let newSlider = new this.model.Slider({
            link:req.body.link,
            tag:req.body.tag,
            imageurl: req.body.imageurl
        })
        newSlider.save(err => {
            if (err)  return res.json({
                data: 'خطا',
                success: false
            });
            return res.json({
                data: 'اسلایدر با موفقیت ثبت شد',
                success: true
            });
        })
    }

    updateSlider(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Slider.findByIdAndUpdate(req.params.id, {
            link:req.body.link,
            tag:req.body.tag,
            imageurl: req.body.imageurl
        }, (err, slider) => {
            if (err) throw err;
            if (slider) {
                return res.json({
                    data: ' اسلاید با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }

    deleteSlider(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Slider.findByIdAndRemove(req.params.id, (err, slider) => {
            if (err) throw err;
            if (slider) {
                return res.json({
                    data: 'اسلاید با موفقیت حذف شد',
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
