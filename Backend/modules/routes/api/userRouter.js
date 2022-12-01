const express = require('express');
const router = express.Router();

// middlewares
const apiAuthAdminUser = require('./middleware/apiAuthAdmin');
const apiAuth = require('./middleware/apiAuth');
const apiAdmin = require('./middleware/apiAdmin');
const { uploadImage } = require('./middleware/UploadMiddleware');
const { uploadFiles } = require('./middleware/UploadMiddleware');

//user Controllers
const { api: ControllerApi } = config.path.controllers;
const UploadController = require(`${ControllerApi}/v1/user/UploadController`);
const AuthUserController = require(`${ControllerApi}/v1/user/AuthUserController`);
const CommentController = require(`${ControllerApi}/v1/user/CommentController`);
const PropertyTypeController = require(`${ControllerApi}/v1/user/PropertyTypeController`);
const PropertyController = require(`${ControllerApi}/v1/user/PropertyController`);
const RequestController = require(`${ControllerApi}/v1/user/RequestController`);
const NewsController = require(`${ControllerApi}/v1/user/NewsController`);
const ContactUsController = require(`${ControllerApi}/v1/user/ContactUsController`);
const SubscriptionController = require(`${ControllerApi}/v1/user/SubscriptionController`);
const ContentController = require(`${ControllerApi}/v1/user/ContentController`);
const TicketController = require(`${ControllerApi}/v1/user/TicketController`);
const FavoriteController = require(`${ControllerApi}/v1/user/FavoriteController`);
const AgentController = require(`${ControllerApi}/v1/user/AgentController`);

//upload 
router.post('/upload', uploadImage.single('file'), UploadController.uploadImage.bind(UploadController));
//multi file
router.post('/multiUpload',uploadFiles,UploadController.uploadFiles.bind(UploadController));

//delete file uploaded in server
router.post('/deleteFile',UploadController.deleteFile.bind(UploadController));

//agent
router.get('/getAgent/:id', AgentController.getAgent.bind(AgentController));
router.get('/getAllAgent', AgentController.getAllAgent.bind(AgentController));
router.get('/getAllAgentByCategoryID/:id', apiAuth,AgentController.getAllAgentByCategoryID.bind(AgentController));
router.get('/getAgentRating/:id', AgentController.getAgentRating.bind(AgentController));
router.post('/registerAgentRating',apiAuth, AgentController.registerAgentRating.bind(AgentController));

//Favorite
router.post('/registerFavorite',apiAuth, FavoriteController.registerFavorite.bind(FavoriteController));
router.delete('/deleteFavorite/:userID/:propertyID',apiAuth, FavoriteController.deleteFavorite.bind(FavoriteController));
router.get('/getFavorite/:id',apiAuth, FavoriteController.getFavorite.bind(FavoriteController));
router.get('/getAllFavorite/:id',apiAuth, FavoriteController.getAllFavorite.bind(FavoriteController));

//Faq
router.get('/getAllFaq', ContentController.getAllFaq.bind(ContentController));
router.get('/getAllSlider', ContentController.getAllSlider.bind(ContentController));

// auth user
router.post('/authUser', AuthUserController.authUser.bind(AuthUserController));
router.put('/updateUser/:id',apiAuth, AuthUserController.updateUser.bind(AuthUserController));
router.get('/getUser/:id',apiAuth, AuthUserController.getUser.bind(AuthUserController));
router.delete('/deleteUser/:id',apiAuth, AuthUserController.deleteUser.bind(AuthUserController));
router.post('/getToken/:id',AuthUserController.getToken.bind(AuthUserController));
//changeMobileNumber
router.put('/changeMobileNumber/:id',apiAuth, AuthUserController.changeMobileNumber.bind(AuthUserController));
router.post('/findMobile',apiAuth, AuthUserController.findMobile.bind(AuthUserController));
//ticket
router.post('/registerTicket', apiAuth,TicketController.registerTicket.bind(TicketController));
router.get('/countTicketForUser/:id', apiAuth,TicketController.countTicketForUser.bind(TicketController));
router.get('/allTicketForUser/:id',apiAuth, TicketController.allTicketForUser.bind(TicketController));
router.put('/replyTicket/:id', apiAuth,TicketController.replyTicket.bind(TicketController));
router.get('/getAllCategoryAgent', apiAuth,TicketController.getAllCategoryAgent.bind(TicketController));

//contact us
router.post('/registerContactUs', ContactUsController.registerContactUs.bind(ContactUsController));

// request visit
router.post('/registerRequestVisit',apiAuth, RequestController.registerRequestVisit.bind(RequestController));
router.delete('/deleteRequestVisit/:id',apiAuth, RequestController.deleteRequestVisit.bind(RequestController));
router.get('/getAllRequestVisitByUser/:id', apiAuth,RequestController.getAllRequestVisitByUser.bind(RequestController));
router.get('/getRequestVisit/:id',apiAuth, RequestController.getRequestVisit.bind(RequestController));

//request property
router.post('/registerRequestProperty',apiAuth, RequestController.registerRequestProperty.bind(RequestController));
router.delete('/deleteRequestProperty/:id',apiAuth, RequestController.deleteRequestProperty.bind(RequestController));
router.put('/updateRequestProperty/:id',apiAuth, RequestController.updateRequestProperty.bind(RequestController));
router.get('/getAllRequestPropertyByUser/:id',apiAuth, RequestController.getAllRequestPropertyByUser.bind(RequestController));
router.get('/getRequestProperty/:id',apiAuth, RequestController.getRequestProperty.bind(RequestController));
//news 
router.get('/getNews/:id', NewsController.getNews.bind(NewsController));
router.get('/getAllNews', NewsController.getAllNews.bind(NewsController));
router.get('/getLatestNews', NewsController.getLatestNews.bind(NewsController));
router.get('/getAllTagNews', NewsController.getAllTagNews.bind(NewsController));
router.post('/getAllNewsByTag', NewsController.getAllNewsByTag.bind(NewsController));

//comment
router.post('/registerComment',apiAuth, CommentController.registerComment.bind(CommentController));
router.get('/countComment/:id',apiAuth, CommentController.countComment.bind(CommentController));
router.get('/allCommentForProperty/:id',apiAuth, CommentController.allCommentForProperty.bind(CommentController));

//subscription
router.post('/registerSubscription', SubscriptionController.registerSubscription.bind(SubscriptionController));

//category
router.get('/getAllPropertyType', PropertyTypeController.getAllPropertyType.bind(PropertyTypeController));
router.get('/getAllSubPropertyType/:id', PropertyTypeController.getAllSubPropertyType.bind(PropertyTypeController));
router.get('/getAllFeature', PropertyTypeController.getAllFeature.bind(PropertyTypeController));
router.get('/getAllTransactionType', PropertyTypeController.getAllTransactionType.bind(PropertyTypeController));
router.get('/getAllExchange', PropertyTypeController.getAllExchange.bind(PropertyTypeController));
router.get('/getAllCondition', PropertyTypeController.getAllCondition.bind(PropertyTypeController));
router.get('/getAllDiscount', PropertyTypeController.getAllDiscount.bind(PropertyTypeController));


//property
router.get('/getAllPropertyByUser/:id',apiAuth,PropertyController.getAllPropertyByUser.bind(PropertyController));
router.get('/getAllProperty', PropertyController.getAllProperty.bind(PropertyController));
router.get('/getProperty/:id', PropertyController.getProperty.bind(PropertyController));
router.post('/registerProperty',apiAuth, PropertyController.registerProperty.bind(PropertyController));
router.put('/updateProperty/:id',apiAuth, PropertyController.updateProperty.bind(PropertyController));
router.get('/countPropertyByUser/:id',apiAuth, PropertyController.countPropertyByUser.bind(PropertyController));

//allPropertyByCategoryID
router.get('/allPropertyByPropertyTypeID/:id', PropertyController.allPropertyByPropertyTypeID.bind(PropertyController));

//allPropertyBySubCategoryID
router.get('/allPropertyBySubPropertyTypeID/:id', PropertyController.allPropertyBySubPropertyTypeID.bind(PropertyController));

//advanceSearchProduct
router.post('/advanceSearchProperty', PropertyController.advanceSearchProperty.bind(PropertyController));

//discountProduct
router.get('/discountProperty', PropertyController.discountProperty.bind(PropertyController));

//newest Products
router.get('/newestProperty', PropertyController.newestProperty.bind(PropertyController));

//allProductBySearch
router.post('/allPropertyBySearch', PropertyController.allPropertyBySearch.bind(PropertyController));

router.use('', router);
module.exports = router;
