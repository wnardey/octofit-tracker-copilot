import mongoose, { Schema } from 'mongoose'

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    duration: { type: Number, required: true, min: 0 },
    distance: { type: Number, min: 0 },
    calories: { type: Number, min: 0 },
    points: { type: Number, required: true, min: 0, default: 0 },
    completedAt: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true },
)

export default mongoose.model('Activity', activitySchema)