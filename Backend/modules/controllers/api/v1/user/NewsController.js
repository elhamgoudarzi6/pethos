const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class NewsController extends Controller {

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
    
    getAllNewsByTag(req, res) {
        this.model.News.find({tags:{$in: req.body.tags}}).exec((err, News) => {
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
    
    getAllTagNews(req, res) {
        this.model.News.find({},{tags:1}).exec((err, News) => {
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
    
      getLatestNews(req, res) {
        this.model.News.find({}).sort({title:-1}).limit(4).exec((err, News) => {
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
