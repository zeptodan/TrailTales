import mongoose from "mongoose";

async function connect(){
    return mongoose.connect(process.env.MONGODB_URI)
}

export default connect