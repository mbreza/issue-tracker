import "./CreateIssue.css"
import {useRef} from "react";
import {useNavigate} from "react-router-dom";
import {actionType} from "../utils/constants";

/**
 * Component creates form that is used to create new issues.
 * TODO: Form is missing validation.
 */
function CreateIssue(props) {
    const {dispatch} = props;
    const titleInput = useRef();
    const descriptionInput = useRef();
    const navigate = useNavigate();

    const createIssue = e => {
        e.preventDefault();
        if (!titleInput.current.value || !descriptionInput.current.value) {
            alert("Form has empty fields");
            return;
        }
        fetch("http://localhost:8080/issue/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: titleInput.current.value,
                description: descriptionInput.current.value
            })
        })
            .then(res => res.json())
            .then(resData => {
            if(resData.status !== 201) {
                alert(resData.message)
                return;
            }
            dispatch({type: actionType.ADD_ISSUE, payload: resData.issue})
            navigate("/")
        })
    }

    return (
        <form onSubmit={createIssue}>
            <label htmlFor="title">Title</label>
            <input id="title" type="text" ref={titleInput}/>
            <label htmlFor="description">Description</label>
            <textarea id="description" ref={descriptionInput}/>
            <button className="form--button" type="submit">
                Create issue
            </button>
        </form>
    );
}

export default CreateIssue;