"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const app_1 = __importDefault(require("./app"));
/** Database connection */
typeorm_1.createConnection()
    .then(async (_) => {
    const port = process.env.PORT || 3000;
    app_1.default.listen(port);
    console.info(`Listening to http://localhost:${port} 🚀`);
})
    .catch((error) => console.log('TypeORM connection error: ', error));
//# sourceMappingURL=server.js.map