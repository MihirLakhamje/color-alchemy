import mongoose, { Schema, Document } from "mongoose";

export interface IPalette extends Document {
  owner: Schema.Types.ObjectId;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  neutralColor: string;
  tags?: string[];
}

const paletteSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    primaryColor: {
      type: String,
      required: true,
    },
    secondaryColor: {
      type: String,
      required: true,
    },
    accentColor: {
      type: String,
      required: true,
    },
    neutralColor: {
      type: String,
      required: true,
    },
    tags: [String],
  },
  {
    timestamps: true,
  }
);

const Palette = mongoose.models.palettes || mongoose.model("palettes", paletteSchema);

export default Palette;
