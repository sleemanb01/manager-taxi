import mongoose, { Types, Document } from "mongoose";
import { IRole } from "./role.model";

const Schema = mongoose.Schema;

export interface ICategory extends Document {
  _id?: Types.ObjectId;
  roleId: IRole["_id"];
  name: string;
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  roleId: { type: Schema.Types.ObjectId, required: true, ref: "Role" },
});

export default mongoose.model<ICategory>("Category", categorySchema);
