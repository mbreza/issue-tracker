import mongoose from "mongoose";

const {Schema} = mongoose;

/**
 * Schema represents document present in Issue collection.
 */
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