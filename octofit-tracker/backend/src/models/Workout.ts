import mongoose, { Schema } from 'mongoose'

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    duration: { type: Number, required: true, min: 1 },
    exercises: [{ type: String, trim: true }],
    target: { type: String, trim: true },
  },
  { timestamps: true },
)

export default mongoose.model('Workout', workoutSchema)