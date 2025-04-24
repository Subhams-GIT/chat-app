"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Usernames_json_1 = __importDefault(require("../Usernames.json"));
function getUsername() {
    return Usernames_json_1.default.usernames[Math.floor(Math.random() * Usernames_json_1.default.usernames.length)];
}
