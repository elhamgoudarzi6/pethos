module.exports = (req, res, next) => {
    if (req.user.type == 'admin') {
        next();
        return;
    }
    return res.status(403).json({
        message: 'شما نمی توانید به این روت دسترسی داشته باشید',
        success: false
    })
}