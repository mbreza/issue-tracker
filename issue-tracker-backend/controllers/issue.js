import Issue from "../models/issue.js";
import {state} from "../utils/constants.js";

export const createIssue = async (req, res) => {
    const issue = new Issue({
        title: req.body.title,
        description: req.body.description,
        state: state.OPEN
    });

    try {
        await issue.save();
        return res.status(201).json({
            message: "Issue created.",
            issue: issue
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: "Unable to create issue."})
    }
};

export const getIssues = async (req, res) => {
    try {
        const issues = await Issue.find();
        return res.status(200).json({
            message: "Issues found.",
            issues: issues
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: "Unable to retrieve issues."})
    }
};