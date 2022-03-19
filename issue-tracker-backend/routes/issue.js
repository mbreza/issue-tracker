import express from "express";
import {createIssue} from "../controllers/issue.js";

const router = express.Router();

router.post("/create", createIssue);

export default router;