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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnect = void 0;
const pg_1 = require("pg");
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let pgPool;
const DbConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!pgPool) {
        pgPool = new pg_1.Pool({
            connectionString: process.env.DATABASE_URL,
            max: 10,
        });
        yield pgPool.query('SELECT 1');
        console.log('📦 PostgreSQL connected');
    }
    return pgPool;
});
exports.DbConnect = DbConnect;
const SingletonPrismaClient = () => new client_1.PrismaClient();
const prisma = (_a = globalThis.prisma) !== null && _a !== void 0 ? _a : SingletonPrismaClient();
if (process.env.NODE_ENV !== 'production')
    globalThis.prisma = prisma;
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
    console.log('🧹 Prisma disconnected');
    process.exit(0);
}));
exports.default = prisma;
