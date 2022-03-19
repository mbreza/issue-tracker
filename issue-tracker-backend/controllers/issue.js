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

export const updateState = async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.issueId);
        if (!issue) {
            return res.status(404).json({message: "Unable to find post."})
        }
        if (issue.state === state.OPEN) {
            issue.state = state.PENDING
        } else if (issue.state === state.PENDING) {
            issue.state = state.CLOSED
        } else {
            return res.status(422).json({message: "Unable to update state."})
        }
        const modifiedIssue = await issue.save();
        res.status(200).json({ message: 'Issue state updated.', issue: modifiedIssue });
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: "Unable to retrieve issues."})
    }
};