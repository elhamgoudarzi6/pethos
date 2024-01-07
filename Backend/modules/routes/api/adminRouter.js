const express = require('express');
const router = express.Router();
const adminRouter = express.Router();

// middlewares
const apiAuthAdmin = require('./middleware/apiAuthAdmin');
const apiAuth = require('./middleware/apiAuth');
const apiAdmin = require('./middleware/apiAdmin');
const { uploadImage } = require('./middleware/UploadMiddleware');
const { uploadFiles } = require('./middleware/UploadMiddleware');

//user Controllers
const { api: ControllerApi } = config.path.controllers;
//admin controller
const AuthController = require(`${ControllerApi}/v1/admin/AuthController`);
const AdminUploadController = require(`${ControllerApi}/v1/admin/UploadController`);
const PropertyController = require(`${ControllerApi}/v1/admin/PropertyController`);
const SliderController = require(`${ControllerApi}/v1/admin/SliderController`);
const PropertyTypeController = require(`${ControllerApi}/v1/admin/PropertyTypeController`);
const CommentController = require(`${ControllerApi}/v1/admin/CommentController`);
const UserController = require(`${ControllerApi}/v1/admin/UserController`);
const SubscriptionController = require(`${ControllerApi}/v1/admin/SubscriptionController`);
const DiscountController = require(`${ControllerApi}/v1/admin/DiscountController`);
const RequestController = require(`${ControllerApi}/v1/admin/RequestController`);
const NewsController = require(`${ControllerApi}/v1/admin/NewsController`);
const ContactUsController = require(`${ControllerApi}/v1/admin/ContactUsController`);
const FaqController = require(`${ControllerApi}/v1/admin/FaqController`);
const AgentController = require(`${ControllerApi}/v1/admin/AgentController`);
const TicketController = require(`${ControllerApi}/v1/admin/TicketController`);

//upload
adminRouter.post('/upload', uploadImage.single('file'), AdminUploadController.uploadImage.bind(AdminUploadController));
//multi file
adminRouter.post('/multiUpload',uploadFiles,AdminUploadController.uploadFiles.bind(AdminUploadController));

//delete file uploaded in server
adminRouter.post('/deleteFile',AdminUploadController.deleteFile.bind(AdminUploadController));

//ticket
adminRouter.post('/registerTicket',apiAuthAdmin,TicketController.registerTicket.bind(TicketController));
adminRouter.get('/getAllTicket',apiAuthAdmin,TicketController.getAllTicket.bind(TicketController));
adminRouter.get('/getAllTicketForAgent/:id',apiAuthAdmin,TicketController.getAllTicketForAgent.bind(TicketController));
adminRouter.get('/countTicket',apiAuthAdmin,TicketController.countTicket.bind(TicketController));
adminRouter.get('/countTicketForAgent/:id',apiAuthAdmin,TicketController.countTicketForAgent.bind(TicketController));
adminRouter.put('/replyTicket/:id',apiAuthAdmin,TicketController.replyTicket.bind(TicketController));

//faq
adminRouter.get('/getAllFaq',apiAuthAdmin,FaqController.getAllFaq.bind(FaqController));
adminRouter.delete('/deleteFaq/:id',apiAuthAdmin,FaqController.deleteFaq.bind(FaqController));
adminRouter.post('/registerFaq',apiAuthAdmin,FaqController.registerFaq.bind(FaqController));
adminRouter.put('/updateFaq/:id',apiAuthAdmin,FaqController.updateFaq.bind(FaqController));

//contact us
adminRouter.get('/getAllContactUs',apiAuthAdmin,ContactUsController.getAllContactUs.bind(ContactUsController));
adminRouter.delete('/deleteContactUs/:id',apiAuthAdmin,ContactUsController.deleteContactUs.bind(ContactUsController));
adminRouter.get('/getContactUs/:id',apiAuthAdmin,ContactUsController.getContactUs.bind(ContactUsController));

//auth admin
adminRouter.post('/loginAdmin', AuthController.loginAdmin.bind(AuthController));
adminRouter.post('/registerAdmin', apiAuthAdmin,AuthController.registerAdmin.bind(AuthController));
adminRouter.put('/updateAdmin/:id', apiAuthAdmin,AuthController.updateAdmin.bind(AuthController));
adminRouter.delete('/deleteAdmin/:id',apiAuthAdmin, AuthController.deleteAdmin.bind(AuthController));
adminRouter.get('/getAllAdmin',apiAuthAdmin, AuthController.getAllAdmin.bind(AuthController));
adminRouter.get('/getAdmin/:id',apiAuthAdmin, AuthController.getAdmin.bind(AuthController));
adminRouter.put('/changePassword/:id',apiAuthAdmin, AuthController.changePassword.bind(AuthController));
adminRouter.put('/changeUsername/:id',apiAuthAdmin, AuthController.changeUsername.bind(AuthController));
adminRouter.put('/resetPassword',apiAuthAdmin, AuthController.resetPassword.bind(AuthController));
//token
adminRouter.post('/getToken/:id', AuthController.getToken.bind(AuthController));



//Agent
adminRouter.post('/registerAgent',apiAuthAdmin, AgentController.registerAgent.bind(AgentController));
adminRouter.get('/getAgent/:id', apiAuthAdmin,AgentController.getAgent.bind(AgentController));
adminRouter.put('/updateAgent/:id',apiAuthAdmin, AgentController.updateAgent.bind(AgentController));
adminRouter.delete('/deleteAgent/:id', apiAuthAdmin,AgentController.deleteAgent.bind(AgentController));
adminRouter.get('/getAllAgent',apiAuthAdmin, AgentController.getAllAgent.bind(AgentController));
adminRouter.get('/getAllAgentByCategoryID/:id',apiAuthAdmin, AgentController.getAllAgentByCategoryID.bind(AgentController));
adminRouter.post('/registerAgentLevel',apiAuthAdmin, AgentController.registerAgentLevel.bind(AgentController));
adminRouter.get('/getAllAgentLevel',apiAuthAdmin, AgentController.getAllAgentLevel.bind(AgentController));
adminRouter.post('/registerPethos',apiAuthAdmin, AgentController.registerPethos.bind(AgentController));
adminRouter.get('/getAllPethos',apiAuthAdmin, AgentController.getAllPethos.bind(AgentController));
adminRouter.post('/registerSubPethos',apiAuthAdmin, AgentController.registerSubPethos.bind(AgentController));
adminRouter.get('/getAllSubPethos/:id',apiAuthAdmin, AgentController.getAllSubPethos.bind(AgentController));
adminRouter.post('/registerSubSubPethos',apiAuthAdmin, AgentController.registerSubSubPethos.bind(AgentController));
adminRouter.get('/getAllSubSubPethos/:id',apiAuthAdmin, AgentController.getAllSubSubPethos.bind(AgentController));
adminRouter.get('/getAgentRating/:id',apiAuthAdmin, AgentController.getAgentRating.bind(AgentController));

//news
adminRouter.post('/registerNews',apiAuthAdmin, NewsController.registerNews.bind(NewsController));
adminRouter.get('/getNews/:id', apiAuthAdmin,NewsController.getNews.bind(NewsController));
adminRouter.put('/updateNews/:id',apiAuthAdmin, NewsController.updateNews.bind(NewsController));
adminRouter.delete('/deleteNews/:id',apiAuthAdmin, NewsController.deleteNews.bind(NewsController));
adminRouter.get('/getAllNews',apiAuthAdmin, NewsController.getAllNews.bind(NewsController));

//user
adminRouter.post('/registerUser',apiAuthAdmin, UserController.registerUser.bind(UserController));
adminRouter.put('/updateUser/:id',apiAuthAdmin, UserController.updateUser.bind(UserController));
adminRouter.delete('/deleteUser/:id',apiAuthAdmin, UserController.deleteUser.bind(UserController));
adminRouter.get('/getUser/:id', apiAuthAdmin,UserController.getUser.bind(UserController));
adminRouter.get('/getAllUser',apiAuthAdmin, UserController.getAllUser.bind(UserController));

//comment
adminRouter.delete('/deleteComment/:id',apiAuthAdmin, CommentController.deleteComment.bind(CommentController));
adminRouter.get('/getAllComment',apiAuthAdmin, CommentController.getAllComment.bind(CommentController));
adminRouter.put('/activeOrDeactiveComment/:id',apiAuthAdmin, CommentController.activeOrDeactiveComment.bind(CommentController));
adminRouter.get('/countComment',apiAuthAdmin, CommentController.countComment.bind(CommentController));
adminRouter.put('/replyComment/:id', apiAuthAdmin,CommentController.replyComment.bind(CommentController));

//discount
adminRouter.post('/registerDiscount',apiAuthAdmin, DiscountController.registerDiscount.bind(DiscountController));
adminRouter.put('/updateDiscount/:id',apiAuthAdmin, DiscountController.updateDiscount.bind(DiscountController));
adminRouter.delete('/deleteDiscount/:id',apiAuthAdmin, DiscountController.deleteDiscount.bind(DiscountController));
adminRouter.get('/getAllDiscount',apiAuthAdmin, DiscountController.getAllDiscount.bind(DiscountController));
adminRouter.get('/getDiscount/:id',apiAuthAdmin, DiscountController.getDiscount.bind(DiscountController));

//RequestProperty
adminRouter.put('/updateStatusRequestProperty/:id',apiAuthAdmin, RequestController.updateStatusRequestProperty.bind(RequestController));
adminRouter.delete('/deleteRequestProperty/:id',apiAuthAdmin, RequestController.deleteRequestProperty.bind(RequestController));
adminRouter.get('/getAllRequestProperty',apiAuthAdmin, RequestController.getAllRequestProperty.bind(RequestController));
adminRouter.get('/getRequestProperty/:id',apiAuthAdmin, RequestController.getRequestProperty.bind(RequestController));

//RequestVisit
adminRouter.put('/updateRequestVisit/:id',apiAuthAdmin, RequestController.updateRequestVisit.bind(RequestController));
adminRouter.get('/getAllRequestVisit',apiAuthAdmin, RequestController.getAllRequestVisit.bind(RequestController));
adminRouter.get('/getRequestVisit/:id',apiAuthAdmin, RequestController.getRequestVisit.bind(RequestController));
adminRouter.get('/getAllRequestVisitForAgent/:id',apiAuthAdmin, RequestController.getAllRequestVisitForAgent.bind(RequestController));
adminRouter.put('/updateStatusRequestVisit/:id',apiAuthAdmin, RequestController.updateStatusRequestVisit.bind(RequestController));

//slider
adminRouter.post('/registerSlider',apiAuthAdmin, SliderController.registerSlider.bind(SliderController));
adminRouter.get('/getAllSlider',apiAuthAdmin, SliderController.getAllSlider.bind(SliderController));
adminRouter.get('/getSlider/:id',apiAuthAdmin, SliderController.getSlider.bind(SliderController));
adminRouter.put('/updateSlider/:id',apiAuthAdmin, SliderController.updateSlider.bind(SliderController));
adminRouter.delete('/deleteSlider/:id',apiAuthAdmin, SliderController.deleteSlider.bind(SliderController));

//Property
adminRouter.post('/registerProperty',apiAuthAdmin, PropertyController.registerProperty.bind(PropertyController));
adminRouter.get('/getProperty/:id',apiAuthAdmin, PropertyController.getProperty.bind(PropertyController));
adminRouter.get('/getAllProperty',apiAuthAdmin, PropertyController.getAllProperty.bind(PropertyController));
adminRouter.put('/updateProperty/:id',apiAuthAdmin, PropertyController.updateProperty.bind(PropertyController));
adminRouter.delete('/deleteProperty/:id',apiAuthAdmin, PropertyController.deleteProperty.bind(PropertyController));
adminRouter.post('/advanceSearchProperty', PropertyController.advanceSearchProperty.bind(PropertyController));

//PropertyType
adminRouter.post('/registerPropertyType',apiAuthAdmin,PropertyTypeController.registerPropertyType.bind(PropertyTypeController));
adminRouter.get('/getAllPropertyType',apiAuthAdmin, PropertyTypeController.getAllPropertyType.bind(PropertyTypeController));
adminRouter.put('/updatePropertyType/:id',apiAuthAdmin, PropertyTypeController.updatePropertyType.bind(PropertyTypeController));
adminRouter.delete('/deletePropertyType/:id',apiAuthAdmin, PropertyTypeController.deletePropertyType.bind(PropertyTypeController));

//SubPropertyType
adminRouter.post('/registerSubPropertyType', apiAuthAdmin,PropertyTypeController.registerSubPropertyType.bind(PropertyTypeController));
adminRouter.get('/getAllSubPropertyType/:id',apiAuthAdmin, PropertyTypeController.getAllSubPropertyType.bind(PropertyTypeController));
adminRouter.get('/getAllSubPropertyType',apiAuthAdmin, PropertyTypeController.getAllSubPropertyType.bind(PropertyTypeController));
adminRouter.put('/updateSubPropertyType/:id',apiAuthAdmin, PropertyTypeController.updateSubPropertyType.bind(PropertyTypeController));
adminRouter.delete('/deleteSubPropertyType/:id',apiAuthAdmin, PropertyTypeController.deleteSubPropertyType.bind(PropertyTypeController));

adminRouter.get('/getAllFeature', PropertyTypeController.getAllFeature.bind(PropertyTypeController));
adminRouter.get('/getAllTransactionType', PropertyTypeController.getAllTransactionType.bind(PropertyTypeController));
adminRouter.get('/getAllExchange', PropertyTypeController.getAllExchange.bind(PropertyTypeController));
adminRouter.get('/getAllCondition', PropertyTypeController.getAllCondition.bind(PropertyTypeController));

//Transaction
adminRouter.post('/registerTransactionType',apiAuthAdmin,PropertyTypeController.registerTransactionType.bind(PropertyTypeController));
//Condition
adminRouter.post('/registerCondition',apiAuthAdmin,PropertyTypeController.registerCondition.bind(PropertyTypeController));
//Exchange
adminRouter.post('/registerExchange',apiAuthAdmin,PropertyTypeController.registerExchange.bind(PropertyTypeController));
//Feature
adminRouter.post('/registerFeature',apiAuthAdmin,PropertyTypeController.registerFeature.bind(PropertyTypeController));

//subscription
adminRouter.get('/getAllSubscription',apiAuthAdmin, SubscriptionController.getAllSubscription.bind(SubscriptionController));
adminRouter.delete('/deleteSubscription/:id',apiAuthAdmin, SubscriptionController.deleteSubscription.bind(SubscriptionController));


router.use('', adminRouter);
module.exports = router;
