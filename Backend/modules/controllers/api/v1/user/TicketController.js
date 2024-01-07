
const Controller = require(`${config.path.controller}/Controller`);
const randomstring = require('randomstring');
module.exports = new class TicketController extends Controller {
    getAllCategoryAgent(req, res) {
        this.model.SubPropertyType.find({}).exec((err, SubPropertyType) => {
            if (err) throw err;
            if (SubPropertyType) {
                return res.json({
                    data: SubPropertyType,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }
    
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

countTicketForUser(req, res) {
    req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
    if (this.showValidationErrors(req, res))
        return;
    this.model.Ticket.count({userID:req.params.id}).exec((err, Ticket) => {
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

allTicketForUser(req, res) {
    req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
    if (this.showValidationErrors(req, res))
        return;
    this.model.Ticket.find({userID:req.params.id}).populate({path: 'User Agent',select:'fullName mobile'}).exec((err, Ticket) => {
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
}

