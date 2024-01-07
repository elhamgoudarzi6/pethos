const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class FavoriteController extends Controller {
        registerFavorite(req, res) {
        if (this.showValidationErrors(req, res))
            return;
        this.model.Favorite.findOne({propertyID: req.body.propertyID,userID: req.body.userID}, (err, result) => {
          if (err) throw err;
        if (result) {
               return res.json({
                data: 'این ملک قبلا در مورد علاقه ها ثبت شده است',
                success: false
            });
        } else {
            let newFavorite = new this.model.Favorite({
                propertyID:req.body.propertyID,
                userID:req.body.userID,
            })
            newFavorite.save(err => {
            if (err) throw err;
            return res.json({
                data: 'با موفقیت ثبت شد',
                success: true
            });
        })
        }
        });
    }



    deleteFavorite(req, res) {
        if (this.showValidationErrors(req, res))
            return;
        this.model.Favorite.deleteOne({userID:req.params.userID,propertyID:req.params.propertyID}, (err, Result) => {
            if (err) throw err;
            if (Result) {
                return res.json({
                    data: 'با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'وجود ندارد',
                success: false
            });
});
    }
    


    getFavorite(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Favorite.findById(req.params.id, (err, Result) => {
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

    getAllFavorite(req, res) {
        this.model.Favorite.find({userID:req.params.id})
        .populate({path:'Property User',populate:{path:'PropertyType SubPropertyType TransactionType Agent Discount'}})
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
    
    

}
