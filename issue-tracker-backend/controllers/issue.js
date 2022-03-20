import Issue from "../models/issue.js";
import {state} from "../utils/constants.js";

/**
 * Function creates issues with initial state OPEN
 *  @returns {Object} - Created issue.
 */
export const createIssue = async (req, res) => {
    const issue = new Issue({
        title: req.body.title,
        description: req.body.description,
        state: state.OPEN
    });

    try {
        await issue.save();
        res.status(201).json({
            message: "Issue created.",
            issue: issue
        });
        return issue;
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: "Unable to create issue."})
    }
};

/**
 * Function retrieves all issues from DB
 *  @returns {Object} - Object containing list of issues.
 */
export const getIssues = async (req, res) => {
    try {
        const issues = await Issue.find();
        res.status(200).json({
            message: "Issues found.",
            issues: issues
        });
        return issues;
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: "Unable to retrieve issues."})
    }
};

/**
 * Function retrieves all issues from DB
 *  @returns {Object} - Object modified by DB.
 */
export const updateState = async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.issueId);
        if (!issue) {
            return res.status(404).json({message: "Unable to find issue."})
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
        return modifiedIssue;
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: "Unable to retrieve issues."})
    }
};

/**
 * Function retrieves all issues from DB
 *  @returns {Object} - Message with sting confirming issue deletion.
 */
export const deleteIssue = async (req, res) => {
    try {
        await Issue.findByIdAndRemove(req.params.issueId);
        res.status(200).json({ message: 'Issue deleted.'});
        return { message: "Issue deleted."};
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: "Unable to delete issue."})
    }
};