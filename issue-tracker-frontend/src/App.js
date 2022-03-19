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
            dispatch({action: action.GET_ALL_ISSUES, payload: resData.issues})
        })

    }, [])

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

const action = {
    GET_ALL_ISSUES: "GET_ALL_ISSUES"
}

function reducer(state, action) {
    switch (action.type) {
        case action.GET_ALL_ISSUES:
            return {issues: action.payload};
        default:
            return state
    }
}
