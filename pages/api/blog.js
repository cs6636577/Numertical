import mongoose from "mongoose";
import { ConnectDB } from "../../lib/config/db";

await ConnectDB();

//สร้างtable
const ProblemSchema = new mongoose.Schema({
    title: String,
    Formula: String,
    iteration: Number,
    result:{
        x: Number,
        y: Number,
        error: Number
    },
    iterations:[{
        x : Number,
        y: Number,
        error: Number
    }]
});

//กันซ้ำ
const Problem = mongoose.models.Problem || mongoose.model("Problem", ProblemSchema);

// pages/api/blog.js หรือ pages/api/blog/index.js
export default async function handler(req,res) {
  try {
    switch (req.method) {
      case "GET": {
        const problems = await Problem.find();
        return res.status(200).json({ success: true, data: problems });
      }
      case "POST": {
        const newProblem = await Problem.create(req.body);
        return res.status(201).json({ success: true, message: "Saved!", data: newProblem });
      }
      default:
        return res.status(405).json({ success: false, error: "Method not allowed" });
    }
    }catch(err){
        console.error(err);
        return res.status(500).json({ success: false, error: err.message });
    }
}
