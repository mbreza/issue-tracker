import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import CreateIssue from "./CreateIssue/CreateIssue";
import {useEffect, useReducer} from "react";

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
            console.log(resData);
        });
    }

    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Issue board</Link>
                    </li>
                    <li>
                        <Link to="/createIssue">Create Issue</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={
                    <div>{
                        state.issues.map(issue => {
                            return (
                                <div key={issue._id}>
                                    <h2>{issue.title}</h2>
                                    <p>{issue.description}</p>
                                    <p>{issue.state}</p>
                                    <button onClick={() => updateIssueState(issue._id)}>Update state</button>
                                </div>
                            )
                        })
                    }</div>
                }/>
                <Route path="/createIssue" element={<CreateIssue/>}/>
            </Routes>
        </Router>
    );
}

export default App;

const initialState = {issues: []};

const actionType = {
    GET_ALL_ISSUES: "GET_ALL_ISSUES",
    UPDATE_STATE: "UPDATE_STATE",
}

function reducer(state, action) {
    switch (action.type) {
        case actionType.GET_ALL_ISSUES:
            return {issues: action.payload};
        case actionType.UPDATE_STATE:
            const newState = structuredClone(state);
            const issueToUpdate = newState.issues.find(issue => issue._id === action.payload._id);
            issueToUpdate.state = action.payload.state;
            return {issues: newState.issues};
        default:
            throw new Error();
    }
}
