import Issue from "../models/issue.js";
import {state} from "../utils/constants.js";

/**
 * Function creates issues with initial state OPEN
 *  @returns {Object} - Created issue or error message.
 */
export const createIssue = async (req, res) => {
    const issue = new Issue({
        title: req.body.title,
        description: req.body.description,
        state: state.OPEN
    });

    try {
        await issue.save();
        res.status(201).json({status: 201, issue: issue});
        return {status: 201, issue: issue};
    } catch (e) {
        console.log(e);
        res.status(500).json({status: 500, message: "Unable to create issue."});
        return {status: 500, message: "Unable to create issue."};
    }
};

/**
 * Function retrieves all issues from DB
 *  @returns {Object} - Object containing list of issues  or error message.
 */
export const getIssues = async (req, res) => {
    try {
        const issues = await Issue.find();
        res.status(200).json({status: 200, issues: issues});
        return {status: 200, issues: issues};
    } catch (e) {
        console.log(e);
        res.status(500).json({status: 500, message: "Unable to retrieve issues."});
        return {status: 500, message: "Unable to retrieve issues."};
    }
};

/**
 * Function retrieves all issues from DB
 *  @returns {Object} - Object modified by DB  or error message.
 */
export const updateState = async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.issueId);
        if (!issue) {
            res.status(404).json({status: 404, message: "Unable to find issue."});
            return {status: 404, message: "Unable to find issue."};
        }
        if (issue.state === state.OPEN) {
            issue.state = state.PENDING;
        } else if (issue.state === state.PENDING) {
            issue.state = state.CLOSED;
        } else {
            res.status(422).json({status: 422, message: "Unable to update state."});
            return {status: 422, message: "Unable to update state."};
        }
        const modifiedIssue = await issue.save();
        res.status(200).json({status: 200, issue: modifiedIssue});
        return {status: 200, issue: modifiedIssue};
    } catch (e) {
        console.log(e);
        res.status(500).json({status: 500, message: "Unable to retrieve issues."});
        return {status: 500, message: "Unable to retrieve issues."};
    }
};

/**
 * Function retrieves all issues from DB
 *  @returns {Object} - Message with string confirming issue deletion  or error message.
 */
export const deleteIssue = async (req, res) => {
    try {
        await Issue.findByIdAndRemove(req.params.issueId);
        res.status(200).json({status: 200, message: 'Issue deleted.'});
        return {status: 200, message: "Issue deleted."};
    } catch (e) {
        console.log(e);
        res.status(500).json({status: 500, message: "Unable to delete issue."});
        return {status: 500, message: "Unable to delete issue."};
    }
};