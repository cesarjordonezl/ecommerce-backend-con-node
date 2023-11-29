const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');

const getAll = catchError(async(req, res) => {
    const userId = req.user.id;
    const purchases =await Purchase.findAll({ where: { userId: userId }});
    return res.json(purchases);
});

module.exports = {
    getAll
}