"use strict";
exports.__esModule = true;
var multer_1 = require("multer");
function errroHandler(err, req, res, next) {
    console.error(err.stack);
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        res.status(400).json({ message: err.message }); // Bad request
        next();
    }
    else if (err instanceof multer_1.MulterError) {
        res.status(400).json({ message: err.message });
        next();
    }
    else if (err.message === 'Unexpected end of form') {
        res.status(400).json({ message: err.message }); // checks if all form fields are provided
        next();
    }
    else if (err.message === 'Not allowed by CORS') {
        res.status(400).json({ message: err.message });
        next();
    }
    else {
        res.status(500).json({ message: 'Something went wrong' });
        next();
    }
}
exports["default"] = errroHandler;
