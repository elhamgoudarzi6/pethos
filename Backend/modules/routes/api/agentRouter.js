const express = require('express');
const router = express.Router();
const agentRouter = express.Router();

// middlewares
const apiAuthAgentUser = require('./middleware/apiAuthAgent');
const apiAdmin = require('./middleware/apiAdmin');
const { uploadImage } = require('./middleware/UploadMiddleware');
const { uploadFiles } = require('./middleware/UploadMiddleware');

//user Controllers
const { api: ControllerApi } = config.path.controllers;
const UploadController = require(`${ControllerApi}/v1/agent/UploadController`);
const AuthController = require(`${ControllerApi}/v1/agent/AuthController`);
const RequestController = require(`${ControllerApi}/v1/agent/RequestController`);
const TicketController = require(`${ControllerApi}/v1/agent/TicketController`);
const PropertyController = require(`${ControllerApi}/v1/agent/PropertyController`);
const PropertyTypeController = require(`${ControllerApi}/v1/agent/PropertyTypeController`);

//upload 
agentRouter.post('/upload', uploadImage.single('file'), UploadController.uploadImage.bind(UploadController));
//multi file
agentRouter.post('/multiUpload',uploadFiles,UploadController.uploadFiles.bind(UploadController));

//delete file uploaded in server
agentRouter.post('/deleteFile',UploadController.deleteFile.bind(UploadController));
// auth user
agentRouter.post('/loginAgent', AuthController.loginAgent.bind(AuthController));
agentRouter.put('/updateAgent/:id',apiAuthAgentUser, AuthController.updateAgent.bind(AuthController));
agentRouter.get('/getAgent/:id',apiAuthAgentUser, AuthController.getAgent.bind(AuthController));
agentRouter.post('/getToken/:id',AuthController.getToken.bind(AuthController));
agentRouter.get('/getAgentRating/:id',AuthController.getAgentRating.bind(AuthController));

//change
agentRouter.put('/changeUsername/:id',apiAuthAgentUser, AuthController.changeUsername.bind(AuthController));
agentRouter.put('/resetPassword',apiAuthAgentUser, AuthController.resetPassword.bind(AuthController));
agentRouter.put('/changePassword/:id',apiAuthAgentUser, AuthController.changePassword.bind(AuthController));
agentRouter.post('/findMobile',apiAuthAgentUser, AuthController.findMobile.bind(AuthController));
agentRouter.put('/changeMobileNumber/:id',apiAuthAgentUser, AuthController.changeMobileNumber.bind(AuthController));

//ticket
agentRouter.post('/registerTicket', apiAuthAgentUser,TicketController.registerTicket.bind(TicketController));
agentRouter.get('/countTicketForAgent/:id', apiAuthAgentUser,TicketController.countTicketForAgent.bind(TicketController));
agentRouter.get('/getAllTicketForAgent/:id',apiAuthAgentUser, TicketController.getAllTicketForAgent.bind(TicketController));
agentRouter.put('/replyTicket/:id', apiAuthAgentUser,TicketController.replyTicket.bind(TicketController));
agentRouter.get('/getAllUser',apiAuthAgentUser, TicketController.getAllUser.bind(TicketController));

// request visit
agentRouter.get('/getRequestVisit/:id',apiAuthAgentUser, RequestController.getRequestVisit.bind(RequestController));
agentRouter.get('/getAllRequestVisitForAgent/:id', apiAuthAgentUser,RequestController.getAllRequestVisitForAgent.bind(RequestController));
agentRouter.put('/updateRequestVisit/:id',apiAuthAgentUser, RequestController.updateRequestVisit.bind(RequestController));
agentRouter.put('/updateStatusRequestVisit/:id',apiAuthAgentUser, RequestController.updateStatusRequestVisit.bind(RequestController));

//request property
agentRouter.put('/updateStatusRequestProperty/:id',apiAuthAgentUser, RequestController.updateStatusRequestProperty.bind(RequestController));
agentRouter.get('/getAllRequestPropertyForAgent/:id',apiAuthAgentUser, RequestController.getAllRequestPropertyForAgent.bind(RequestController));
agentRouter.get('/getRequestProperty/:id',apiAuthAgentUser, RequestController.getRequestProperty.bind(RequestController));

//property
agentRouter.get('/getAllPropertyForAgent/:id',apiAuthAgentUser, PropertyController.getAllPropertyForAgent.bind(PropertyController));
agentRouter.get('/getProperty/:id',apiAuthAgentUser, PropertyController.getProperty.bind(PropertyController));
agentRouter.get('/countPropertyForAgent/:id',apiAuthAgentUser, PropertyController.countPropertyForAgent.bind(PropertyController));
agentRouter.post('/registerProperty',apiAuthAgentUser, PropertyController.registerProperty.bind(PropertyController));
agentRouter.delete('/deleteProperty/:id',apiAuthAgentUser, PropertyController.deleteProperty.bind(PropertyController));
agentRouter.put('/updateProperty/:id',apiAuthAgentUser, PropertyController.updateProperty.bind(PropertyController));
//gets
agentRouter.get('/getAllPropertyType', PropertyTypeController.getAllPropertyType.bind(PropertyTypeController));
agentRouter.get('/getAllSubPropertyType', PropertyTypeController.getAllSubPropertyType.bind(PropertyTypeController));
agentRouter.get('/getAllFeature', PropertyTypeController.getAllFeature.bind(PropertyTypeController));
agentRouter.get('/getAllTransactionType', PropertyTypeController.getAllTransactionType.bind(PropertyTypeController));
agentRouter.get('/getAllExchange', PropertyTypeController.getAllExchange.bind(PropertyTypeController));
agentRouter.get('/getAllCondition', PropertyTypeController.getAllCondition.bind(PropertyTypeController));
agentRouter.get('/getAllUser', PropertyTypeController.getAllUser.bind(PropertyTypeController));

router.use('', agentRouter);
module.exports = router;
