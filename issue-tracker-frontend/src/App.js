import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import CreateIssue from "./CreateIssue/CreateIssue";

function App() {
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
                <Route path="/" element={<h1>I will be Issue board</h1>}/>
                <Route path="/createIssue" element={<CreateIssue />}/>
            </Routes>
        </Router>
    );
}

export default App;
