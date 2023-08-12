import UtilityController from "../controllers/utility.controller";
import express from "express";

const UtilityRouter = express.Router();

UtilityRouter.route("/info").get(UtilityController.info);
UtilityRouter.route("/post").post(UtilityController.apiPostRequest);
UtilityRouter.route("/post/response").post(UtilityController.apiReturnREQBody);

export default UtilityRouter;