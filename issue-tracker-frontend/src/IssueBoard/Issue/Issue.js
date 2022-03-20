import {actionType} from "../../utils/constants";
import "./Issue.css"

function Issue(props) {
    const {issue, dispatch, updateText} = props;
    const {title, description, state, _id} = issue;

    const updateIssueState = (issueId) => {
        fetch("http://localhost:8080/issue/" + issueId, {
            method: "PUT"
        }).then(res => {
            if (res.status !== 200) {
                throw new Error('Failed to change the state.');
            }
            return res.json()
        }).then(resData => {
            dispatch({type: actionType.UPDATE_STATE, payload: resData.issue})
        });
    }

    const deleteIssue = (issueId) => {
        fetch("http://localhost:8080/issue/" + issueId, {
            method: "DELETE"
        }).then(res => {
            if (res.status !== 200) {
                throw new Error('Failed to delete issue.');
            }
            return res.json()
        }).then(() => {
            dispatch({type: actionType.DELETE_ISSUE, payload: { _id: issueId, state: state}});
        });
    }


    return (
        <li className="issue">
            <h3>{title}</h3>
            <p>{description}</p>
            {updateText &&  <button onClick={() => updateIssueState(_id)}>{updateText}</button>}
            <button onClick={() => deleteIssue(_id)}>Delete issue</button>
        </li>
    );
}

export default Issue;