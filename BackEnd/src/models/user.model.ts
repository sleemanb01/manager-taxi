import mongoose, { Schema, Document, Types } from "mongoose";
import { IRole } from "./role.model";

export interface IUser extends Document {
  _id?: string;
  name?: string;
  phone: string;
  image?: string;
  role: IRole["_id"];
}

const MINLENGTH = 6;

export const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: false },
  phone: { type: String, required: true, unique: true },
  roleId: { type: Schema.Types.ObjectId, required: true, ref: "Role" },
});

export default mongoose.model<IUser>("User", UserSchema);
