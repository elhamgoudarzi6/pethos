
const Controller = require(`${config.path.controller}/Controller`);
const randomstring = require('randomstring');
module.exports = new class TicketController extends Controller {
    registerTicket(req, res) {
        if (this.showValidationErrors(req, res))
            return;
        this.model.Ticket({
            userID: req.body.userID,
            agentID: req.body.agentID,
            date: req.body.date,
            time: req.body.time,
            ticketNumber:randomstring.generate({charset: '123456789', length: 6}),
            title:req.body.title,
            detail:req.body.detail,
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

   getAllTicketForAgent(req, res) {
        this.model.Ticket.find({agentID:req.params.id}).populate({path:'User Agent', select: 'fullName mobile'}).exec((err, Ticket) => {
            if (err) throw err;
            if (Ticket) {
                return res.json({
                    data: Ticket,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
}


countTicketForAgent(req, res) {
    req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
    if (this.showValidationErrors(req, res))
        return;
    this.model.Ticket.count({agentID:req.params.id}).exec((err, Ticket) => {
        if (err) throw err;
        if (Ticket) {
            return res.json({
                data: Ticket,
                success: true
            });
        }
        res.json({
            data: 'اطلاعاتی وجود ندارد',
            success: false
        })
    });
}

replyTicket(req, res) {
    console.log(req.body);
    req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
    if (this.showValidationErrors(req, res))
        return;
    this.model.Ticket.findByIdAndUpdate(req.params.id, {
         $push: { detail: req.body.detail } 
        }, (err, Ticket) => {
        if (err) throw err;
        if (Ticket) {
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

    getAllUser(req, res) {
        this.model.User.find({},{mobile:1,fullName:1} ,(err, User) => {
            if (User) {
                return res.json({
                    data: User,
                    success: true
                })
            }
            res.json({
                data: 'کاربر یافت نشد',
                success: false
            })
        })
    }


}


