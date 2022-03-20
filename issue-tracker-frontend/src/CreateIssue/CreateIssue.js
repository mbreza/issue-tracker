import "./CreateIssue.css"
import {useRef} from "react";

function CreateIssue() {
    const titleInput = useRef();
    const descriptionInput = useRef();

    const createIssue = e => {
        e.preventDefault();
        if (!titleInput.current.value || !descriptionInput.current.value) {
            alert("Form has empty fields");
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
        }).then(res => {
            if (res.status !== 201) {
                alert("Failed to create issue.");
            }
            return res.json();
        }).then(resData => {
            console.log(resData);
        })
    }

    return (
        <form onSubmit={createIssue}>
            <label htmlFor="title">Title</label>
            <input id="title" type="text" ref={titleInput}/>
            <label htmlFor="description">Description</label>
            <input id="description" type="text" ref={descriptionInput}/>
            <button type="submit">
                Create issue
            </button>
        </form>
    );
}

export default CreateIssue;