import express from "express";
import {createIssue, deleteIssue, getIssues, updateState} from "../controllers/issue.js";

const router = express.Router();

router.post("/create", createIssue);
router.get("/getAll", getIssues);
router.put("/:issueId", updateState);
router.delete("/:issueId", deleteIssue);

export default router;