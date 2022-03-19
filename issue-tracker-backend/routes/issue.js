import express from "express";
import {createIssue, getIssues, updateState} from "../controllers/issue.js";

const router = express.Router();

router.post("/create", createIssue);
router.get("/getAll", getIssues);
router.put("/:issueId", updateState);

export default router;