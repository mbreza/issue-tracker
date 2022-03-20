import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import CreateIssue from "../CreateIssue/CreateIssue";
import {useEffect, useReducer} from "react";
import {actionType, issueState} from "../utils/constants";
import IssueBoard from "../IssueBoard/IssueBoard";

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        fetch("http://localhost:8080/issue/getAll").then(res => {
            if (res.status !== 200) {
                throw new Error('Failed to get issues.');
            }
            return res.json()
        }).then(resData => {
            dispatch({type: actionType.GET_ALL_ISSUES, payload: resData.issues})
        });

    }, [])

    return (
        <Router>
            <nav>
                <ul className="nav-list">
                    <li className="nav-list__item">
                        <Link to="/">Issue board</Link>
                    </li>
                    <li className="nav-list__item">
                        <Link to="/createIssue">Create Issue</Link>
                    </li>
                </ul>
            </nav>
            <main>
                <Routes>
                    <Route path="/" element={<IssueBoard state={state} dispatch={dispatch}/>}/>
                    <Route path="/createIssue" element={<CreateIssue dispatch={dispatch}/>}/>
                </Routes>
            </main>
        </Router>
    );
}

export default App;

const initialState = {openIssues: [], pendingIssues: [], closedIssues: []};

function reducer(state, action) {
    switch (action.type) {
        case actionType.GET_ALL_ISSUES:
            const openIssues = action.payload.filter(issue => issue.state === issueState.OPEN);
            const pendingIssues = action.payload.filter(issue => issue.state === issueState.PENDING);
            const closedIssues = action.payload.filter(issue => issue.state === issueState.CLOSED);
            return {openIssues: openIssues, pendingIssues: pendingIssues, closedIssues: closedIssues};
        case actionType.UPDATE_STATE:
            const stateToUpdate = structuredClone(state);
            if (action.payload.state === issueState.PENDING) {
                const indexToRemove = stateToUpdate.openIssues.findIndex(issue => issue._id === action.payload._id);
                stateToUpdate.openIssues.splice(indexToRemove, 1);
                stateToUpdate.pendingIssues.push(action.payload);
            } else if (action.payload.state === issueState.CLOSED) {
                const indexToRemove = stateToUpdate.pendingIssues.findIndex(issue => issue._id === action.payload._id);
                stateToUpdate.pendingIssues.splice(indexToRemove, 1);
                stateToUpdate.closedIssues.push(action.payload);
            }
            return stateToUpdate;
        case actionType.DELETE_ISSUE:
            const stateToDelete = structuredClone(state);
            if (action.payload.state === issueState.OPEN) {
                const indexToRemove = stateToDelete.openIssues.findIndex(issue => issue._id === action.payload._id);
                stateToDelete.openIssues.splice(indexToRemove, 1)
            } else if (action.payload.state === issueState.PENDING) {
                const indexToRemove = stateToDelete.pendingIssues.findIndex(issue => issue._id === action.payload._id);
                stateToDelete.pendingIssues.splice(indexToRemove, 1)
            } else if (action.payload.state === issueState.CLOSED) {
                const indexToRemove = stateToDelete.closedIssues.findIndex(issue => issue._id === action.payload._id);
                stateToDelete.closedIssues.splice(indexToRemove, 1)
            }
            return stateToDelete;
        case actionType.ADD_ISSUE:
            const newOpenIssues = structuredClone(state.openIssues);
            newOpenIssues.push(action.payload);
            return {...state, openIssues: newOpenIssues}
        default:
            throw new Error();
    }
}
