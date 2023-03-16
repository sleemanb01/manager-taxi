import mongoose, { Schema, Types } from "mongoose";

export interface IRole extends Document {
  _id?: Types.ObjectId;
  name: string;
}

const RoleSchema = new Schema({
  name: { type: String, required: true },
});

export default mongoose.model<IRole>("Role", RoleSchema);
