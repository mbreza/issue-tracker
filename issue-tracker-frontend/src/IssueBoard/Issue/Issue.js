import {actionType} from "../../utils/constants";
import "./Issue.css"

/**
 * Component creates issues and sends request to backend to update or delete issue.
 */
function Issue(props) {
    const {issue, dispatch, updateText} = props;
    const {title, description, state, _id} = issue;

    const updateIssueState = (issueId) => {
        fetch("http://localhost:8080/issue/" + issueId, {
            method: "PUT"
        })
            .then(res => res.json())
            .then(resData => {
                if (resData.status !== 200) {
                    alert(resData.message);
                    return;
                }
                dispatch({type: actionType.UPDATE_STATE, payload: resData.issue});
            });
    }

    const deleteIssue = (issueId) => {
        fetch("http://localhost:8080/issue/" + issueId, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(resData => {
                if (resData.status !== 200) {
                    alert(resData.message);
                    return;
                }
                dispatch({type: actionType.DELETE_ISSUE, payload: {_id: issueId, state: state}});
            });
    }


    return (
        <li className="issue">
            <h3>{title}</h3>
            <p>{description}</p>
            {updateText &&
                <button className="issue--button" onClick={() => updateIssueState(_id)}>{updateText}</button>}
            <button className="issue--button" onClick={() => deleteIssue(_id)}>Delete issue</button>
        </li>
    );
}

export default Issue;