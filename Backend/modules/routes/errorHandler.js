const express = require('express');
const router = express.Router();
router.all('*' , async (req , res , next) => {
    try {
        res.statusCode = 404;
        throw new Error('چنین روتی یافت نشد');
    } catch(err) {
        next(err)
    }
});
router.use((err , req , res , next) => {
    const statusCode = res.statusCode || 500;
    const message = err.message || '';
    const stack = err.stack || '';
  return   res.json({
        statuscode:statusCode,
        message:message,
        error:stack,
        success: false
    })
    next();
})

module.exports = router;