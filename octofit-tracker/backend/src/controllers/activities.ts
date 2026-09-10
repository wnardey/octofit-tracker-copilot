import { Request, Response } from 'express'
import Activity from '../models/Activity.js'

export async function listActivities(request: Request, response: Response) {
  const userId = typeof request.query.user === 'string' ? request.query.user : undefined
  const filter = userId ? { user: userId } : {}
  response.json(await Activity.find(filter).populate('user').sort({ completedAt: -1 }))
}

export async function getActivity(request: Request, response: Response) {
  const activity = await Activity.findById(request.params.id).populate('user')
  if (!activity) return response.status(404).json({ message: 'Activity not found' })
  response.json(activity)
}

export async function createActivity(request: Request, response: Response) {
  const activity = await Activity.create(request.body)
  response.status(201).json(await activity.populate('user'))
}

export async function updateActivity(request: Request, response: Response) {
  const activity = await Activity.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true }).populate('user')
  if (!activity) return response.status(404).json({ message: 'Activity not found' })
  response.json(activity)
}

export async function deleteActivity(request: Request, response: Response) {
  const activity = await Activity.findByIdAndDelete(request.params.id)
  if (!activity) return response.status(404).json({ message: 'Activity not found' })
  response.status(204).send()
}