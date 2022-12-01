// Model
const Admin= require(`${config.path.model}/admin`);
const User = require(`${config.path.model}/user`);
const AgentRating=require(`${config.path.model}/agentRating`);
const Property = require(`${config.path.model}/property`);
const Slider = require(`${config.path.model}/slider`);
const Agent=require(`${config.path.model}/agent`);
const Subscription=require(`${config.path.model}/subscription`);
const Comment=require(`${config.path.model}/comment`);
const Discount=require(`${config.path.model}/discount`);
const RequestProperty=require(`${config.path.model}/requestProperty`);
const News=require(`${config.path.model}/news`);
const ContactUs=require(`${config.path.model}/contactUs`);
const Faq=require(`${config.path.model}/faq`);
const PropertyType=require(`${config.path.model}/propertyType`);
const SubPropertyType=require(`${config.path.model}/subPropertyType`);
const Condition=require(`${config.path.model}/condition`);
const Exchange=require(`${config.path.model}/exchange`);
const Feature=require(`${config.path.model}/feature`);
const TransactionType=require(`${config.path.model}/transactionType`);
const RequestVisit=require(`${config.path.model}/requestVisit`);
const Ticket=require(`${config.path.model}/ticket`);
const Favorite=require(`${config.path.model}/favorite`);
const AgentLevel=require(`${config.path.model}/agentlevel`);
const Pethos=require(`${config.path.model}/pethos`);
const SubPethos=require(`${config.path.model}/subPethos`);
const SubSubPethos=require(`${config.path.model}/subSubPethos`);

module.exports = class Controller {
    constructor() {
        this.model = { Pethos,SubPethos,SubSubPethos,Admin,User,Slider,Agent,Exchange,TransactionType,
            Subscription,Property,AgentRating,Condition,Feature,AgentLevel,
            Comment,Discount,RequestProperty,News,ContactUs,Faq,PropertyType,RequestVisit,SubPropertyType,Ticket,Favorite
        }
    }
    showValidationErrors(req, res, callback) {
        let errors = req.validationErrors();
        if (errors) {
            res.json({
                message: errors.map(error => {
                    return {
                        'field': error.param,
                        'message': error.msg
                    }
                }),
                success: false
            });
            return true;
        }
        return false
    }

    escapeAndTrim(req, items) {
        items.split(' ').forEach(item => {
            req.sanitize(item).escape();
            req.sanitize(item).trim();
        });
    }
}
