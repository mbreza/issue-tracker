import express from "express";
import {createIssue, getIssues} from "../controllers/issue.js";

const router = express.Router();

router.post("/create", createIssue);
router.get("/getAll", getIssues);

export default router;