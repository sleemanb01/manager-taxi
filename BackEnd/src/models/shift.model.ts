import { Type } from "aws-sdk/clients/cloudformation";
import mongoose, { Schema, Types, Document } from "mongoose";
import { IStock } from "./stock.model";
import { IUser } from "./user.model";

export type IUsage = {
  stockId: IStock["_id"];
  quantity: number;
};

export interface IShift extends Document {
  _id?: Types.ObjectId;
  date: Date;
  meat: number;
  bread: number;
  consumption: Array<IUsage>;
  supply: Array<IUsage>;
  workers: Array<IUser>;
}

const UsageSchema = new Schema(
  {
    stockId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Stock",
    },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const ShiftSchema: Schema = new Schema({
  date: { type: Date, required: true, unique: true },
  meat: { type: Number, required: true },
  bread: { type: Number, required: true },
  consumption: [UsageSchema],
  supply: [UsageSchema],
  workers: [UsageSchema],
});

export default mongoose.model<IShift>("Shift", ShiftSchema);
