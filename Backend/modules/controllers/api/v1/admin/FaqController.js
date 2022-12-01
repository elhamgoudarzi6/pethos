const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class FaqController extends Controller {
    getAllFaq(req, res) {
        this.model.Faq.find({}).exec((err, Faq) => {
            if (err) throw err;
            if (Faq) {
                return res.json({
                    data: Faq,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }
    
      updateFaq(req, res) {
        let listFields={};
        if(req.body.category){ listFields.category=req.body.category}
        if(req.body.question){ listFields.question=req.body.question}
        if(req.body.reply){ listFields.reply=req.body.reply}
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
          if (this.showValidationErrors(req, res))
              return;
          this.model.Faq.findByIdAndUpdate(req.params.id,listFields, (err, Result) => {
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

    registerFaq(req, res) {
        req.checkBody('question', '  فیلد سوال نمیتواند خالی بماند').notEmpty();
        req.checkBody('reply', '  فیلد جواب نمیتواند خالی بماند').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        let newFaq = new this.model.Faq({
            category:req.body.category,
            question:req.body.question,
            reply:req.body.reply,
        })
        newFaq.save(err => {
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


    deleteFaq(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Faq.findByIdAndRemove(req.params.id, (err, Faq) => {
            if (err) throw err;
            if (Faq) {
                return res.json({
                    data: 'با موفقیت حذف شد',
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
