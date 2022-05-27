const {check} = require('express-validator');
module.exports = [
    check("title").notEmpty().withMessage("requerido")
    .isAlphanumeric().withMessage("nombre invalido"),
    check("rating").notEmpty().withMessage("requrido"),
    check("awards").notEmpty().withMessage("requerido"),
    check("release_date").notEmpty().withMessage("requrido"),
]