# Issue tracker
## Description
Issue tracker was developed with Node version 16.13.1.
### Backend
Backend is created in Node.js and is using MongoDB to store the issues. 
It is simple REST API that allows to make requests to:
- get all issues
- add issue
- delete issue
- modify issue state
### Frontend
Frontend is created in React. The starting project was created with Create React App. 
It is using hooks based implementation. It contains a from that allows us to create
new issues and board that displays issues in three columns divided by status. 
Each issue has buttons that allow users to change the status and remove the issue.
## Improvement suggestions
- logging with different log levels and possibility to store logs in file
- input validation in form responsible for creating issues
- tests for frontend side of the solution
- make UI nicer, since it has absolute minimal amount of CSS
- use SASS or styled components instead of CSS
- use WebSocket to introduce dynamic updates of the board without reloading the page
- use tools like Babel to write modern JavaScript and have better testing setup on the backend
- introduce CSS for smaller breakpoints
- accessibility improvements like better outline, focus management or aria attributes with additional information
- use tools like prettier and eslint for formatting and analyzing the code
- pre-commit hook that runs eslint