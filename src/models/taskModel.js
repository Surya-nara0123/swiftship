import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    taskTitle: {
        type: String,
        required: [true, "Please provide a title"],
    },
    type: {
        type: String,
        required: [true, "Please provide a tasks type"],
    },
    fromLocation: {
        type: String,
        required: [true, "Please provide a location"],
    },
    toLocation: {
        type: String,
        required: [true, "Please provide a location"],
    },
    fromUsername: {
        type: String,
        required: [true, "Please provide a fromUsername"],
    },
    toUsername: {
        type: String,
    }
})

const Tasks = mongoose.models.tasks || mongoose.model("tasks", taskSchema);

export default Tasks;