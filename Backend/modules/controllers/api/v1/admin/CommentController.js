const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class CommentController extends Controller {

        deleteComment(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Comment.findByIdAndRemove(req.params.id, (err, Comment) => {
            if (err) throw err;
            if (Comment) {
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

    getAllComment(req, res) {
        this.model.Comment.find({}).populate({path:'User'}).exec((err, Comment) => {
            if (err) throw err;
            if (Comment) {
                return res.json({
                    data: Comment,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
}

countComment(req, res) {
    if (this.showValidationErrors(req, res))
        return;
    this.model.Comment.count({}).exec((err, Comment) => {
        if (err) throw err;
        if (Comment) {
            return res.json({
                data: Comment,
                success: true
            });
        }
        res.json({
            data: 'اطلاعاتی وجود ندارد',
            success: false
        })
    });
}

activeOrDeactiveComment(req, res) {
    req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
    if (this.showValidationErrors(req, res))
        return;
    this.model.Comment.findByIdAndUpdate(req.params.id, {
        active: req.body.active,
        }, (err, Comment) => {
        if (err) throw err;
        if (Comment) {
            return res.json({
                data: '  با موفقیت آپدیت شد',
                success: true
            });
        }
        res.status(404).json({
            data: '  وجود ندارد',
            success: false
        });
    });
}

replyComment(req, res) {
    req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
    if (this.showValidationErrors(req, res))
        return;
    this.model.Comment.findByIdAndUpdate(req.params.id, {
        reply: req.body.reply,
        }, (err, Comment) => {
        if (err) throw err;
        if (Comment) {
            return res.json({
                data:'پاسخ با موفقیت ثبت شد',
                success: true
            });
        }
        res.status(404).json({
            data: '  وجود ندارد',
            success: false
        });
    });
}


}
