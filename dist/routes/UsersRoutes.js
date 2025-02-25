"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsersController_1 = __importDefault(require("../controllers/UsersController"));
const router = (0, express_1.Router)();
router.post("/users", UsersController_1.default.createUser);
router.get("/users", UsersController_1.default.getUsers);
router.get("/users/:user_id", UsersController_1.default.getUserById);
router.put("/users/:user_id", UsersController_1.default.updateUser);
router.patch("/users/:id_comment", UsersController_1.default.partialUpdateUser);
router.delete("/users/:user_id", UsersController_1.default.deleteUser);
router.delete("/usersdeleteAll", UsersController_1.default.deleteAllData);
exports.default = router;
