
exports.getProducts = (req, res, next) =>{
    res.status(200).json({
        success: true,
        massage: "This route will show all products in database."
    })
}