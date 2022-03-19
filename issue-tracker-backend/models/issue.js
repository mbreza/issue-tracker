import mongoose from "mongoose";

const {Schema} = mongoose;

const issueSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        }
    }
);

export default mongoose.model("Issue", issueSchema);