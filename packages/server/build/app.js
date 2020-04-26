"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const koa_json_1 = __importDefault(require("koa-json"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const app = new koa_1.default();
const router = new koa_router_1.default();
/** Middlewares */
app.use(koa_json_1.default());
app.use(koa_logger_1.default());
app.use(koa_bodyparser_1.default());
/** Routes */
app.use(router.routes()).use(router.allowedMethods());
router.get('/', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.body = { message: 'Hello World' };
}));
router.post('/data', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.body = {
        message: 'This is your POST route, attached you can find the data you sent',
        body: ctx.request.body,
    };
}));
exports.default = app;
//# sourceMappingURL=app.js.map