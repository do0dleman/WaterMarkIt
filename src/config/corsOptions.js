"use strict";
exports.__esModule = true;
var whitelist = [
    'http://127.0.0.1:5173',
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:3000', // for development
];
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.includes(origin) || !origin) {
            callback(null, true);
            return;
        }
        callback((new Error('Not allowed by CORS')));
    },
    optionsSuccessStatus: 200
};
exports["default"] = corsOptions;
