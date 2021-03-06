import "./IssuesBoard.css"
import Issue from "./Issue/Issue";

/**
 * Component creates board of issues divided by state.
 */
function IssuesBoard(props) {
    const {state, dispatch} = props;

    return (
        <>
            <h1>Issues Board</h1>
            <div className="issue-board">
                <div className="issue-board__column">
                    <h2>Open issues</h2>
                    <ul className="issue-board__list">
                        {state.openIssues.map(issue => <Issue key={issue._id} issue={issue} dispatch={dispatch} updateText="Move to pending"/>)}
                    </ul>
                </div>
                <div className="issue-board__column">
                    <h2>Pending issues</h2>
                    <ul className="issue-board__list">
                        {state.pendingIssues.map(issue => <Issue key={issue._id} issue={issue} dispatch={dispatch} updateText="Move to closed"/>)}
                    </ul>
                </div>
                <div className="issue-board__column">
                    <h2>Closed issues</h2>
                    <ul className="issue-board__list">
                        {state.closedIssues.map(issue => <Issue key={issue._id} issue={issue} dispatch={dispatch}/>)}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default IssuesBoard;