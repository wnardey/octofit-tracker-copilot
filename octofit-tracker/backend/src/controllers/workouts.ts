import { Request, Response } from 'express'
import Workout from '../models/Workout.js'

export async function listWorkouts(request: Request, response: Response) {
  const difficulty = typeof request.query.difficulty === 'string' ? request.query.difficulty : undefined
  const workouts = Workout.find()
  if (difficulty) workouts.where('difficulty').equals(difficulty)
  response.json(await workouts.sort({ createdAt: -1 }))
}

export async function getWorkout(request: Request, response: Response) {
  const workout = await Workout.findById(request.params.id)
  if (!workout) return response.status(404).json({ message: 'Workout not found' })
  response.json(workout)
}

export async function createWorkout(request: Request, response: Response) {
  response.status(201).json(await Workout.create(request.body))
}

export async function updateWorkout(request: Request, response: Response) {
  const workout = await Workout.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true })
  if (!workout) return response.status(404).json({ message: 'Workout not found' })
  response.json(workout)
}

export async function deleteWorkout(request: Request, response: Response) {
  const workout = await Workout.findByIdAndDelete(request.params.id)
  if (!workout) return response.status(404).json({ message: 'Workout not found' })
  response.status(204).send()
}