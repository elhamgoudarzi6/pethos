const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class NewsController extends Controller {

    registerNews(req, res) {
        req.checkBody('title', 'وارد کردن فیلد عنوان الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.News({
            title: req.body.title,
            brief: req.body.brief,
            details: req.body.details,
            keywords: req.body.keywords,
            image: req.body.image,
            imageDescription: req.body.imageDescription,
            date: req.body.date,
            metaDescription: req.body.metaDescription,
            tags:req.body.tags
        }).save(err => {
            if (err) {
                throw err;
            }
            return res.json({
                data: 'خبر با موفقیت ثبت  شد',
                success: true
            });
        });
    }

    updateNews(req, res) {
        let listFields={};
        if(req.body.title){ listFields.title=req.body.title}
        if(req.body.brief){ listFields.brief=req.body.brief}
        if(req.body.details){ listFields.details=req.body.details}
        if(req.body.keywords){ listFields.keywords=req.body.keywords}
        if(req.body.image){ listFields.image=req.body.image}
        if(req.body.imageDescription){ listFields.imageDescription=req.body.imageDescription}
        if(req.body.date){ listFields.date=req.body.date}
        if(req.body.metaDescription){ listFields.metaDescription=req.body.metaDescription}
        if(req.body.tags){ listFields.tags=req.body.tags}
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.News.findByIdAndUpdate(req.params.id,listFields, (err, News) => {
            if (err) throw err;
            if (News) {
                return res.json({
                    data: 'خبر با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }
  
 
    deleteNews(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.News.findByIdAndRemove(req.params.id, (err, News) => {
            if (err) throw err;
            if (News) {
                return res.json({
                    data: 'خبر با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }


    getNews(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.News.findById(req.params.id, (err, News) => {
            if (News) {
                return res.json({
                    data: News,
                    success: true
                })
            }
            res.json({
                data: 'یافت نشد',
                success: false
            })
        })
    }

    getAllNews(req, res) {
        this.model.News.find({}).exec((err, News) => {
                if (err) throw err;
                if (News) {
                    return res.json({
                        data: News,
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
