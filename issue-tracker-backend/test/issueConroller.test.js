import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import {createIssue, deleteIssue, getIssues, updateState} from "../controllers/issue.js";
import {state} from "../utils/constants.js";

const mongoServer = await MongoMemoryServer.create();

describe("Testing Issues controller", () => {
    let res;
    let issueId;

    beforeAll(async () => {
        await mongoose.connect(mongoServer.getUri(), { dbName: "testingDB" });
        res = {
            status: function() {
                return this;
            },
            json: function() {}
        };
    });

    beforeEach(async () => {
        const req = {
            body: {
                title: "Test title",
                description: "Test description",
            },
        };
        const createdIssue = await createIssue(req, res)
        issueId = createdIssue.issue._id.toString();
    });

    afterEach(async () => {
        //clean database
        const collections = mongoose.connection.collections
        await collections["issues"].deleteMany();
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongoServer.stop();
    });

    it("New issue should be created", async () => {
        const req = {
            body: {
                title: "title",
                description: "description",
            },
        };
        const createdIssue = await createIssue(req, res)
        expect(createdIssue.issue.title).toBe("title");
        expect(createdIssue.issue.description).toBe("description");
        expect(createdIssue.issue.state).toBe(state.OPEN);
        expect(createdIssue.status).toBe(201);
    });

    it("Should get list of issues", async () => {
        const issuesResponse = await getIssues({}, res);
        expect(issuesResponse.issues.length).toBe(1);
        expect(issuesResponse.issues[0].title).toBe("Test title");
        expect(issuesResponse.status).toBe(200);
    });

    it("Should update issue state", async () => {
        const updatedIssue = await updateState({params: {issueId: issueId}}, res);
        expect(updatedIssue.issue._doc.state).toBe(state.PENDING);
        expect(updatedIssue.status).toBe(200);
    });

    it("Should delete issue", async () => {
        const deletedMessage = await deleteIssue({params: {issueId: issueId}}, res);
        expect(deletedMessage.message).toBe("Issue deleted.");
        expect(deletedMessage.status).toBe(200);

        const issuesList = await getIssues({}, res);
        expect(issuesList.issues.length).toBe(0);
    });
})
