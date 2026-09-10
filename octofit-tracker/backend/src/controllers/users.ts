import { Request, Response } from 'express'
import User from '../models/User.js'

export async function listUsers(_request: Request, response: Response) {
  response.json(await User.find().populate('team').sort({ createdAt: -1 }))
}

export async function getUser(request: Request, response: Response) {
  const user = await User.findById(request.params.id).populate('team')
  if (!user) return response.status(404).json({ message: 'User not found' })
  response.json(user)
}

export async function createUser(request: Request, response: Response) {
  const user = await User.create(request.body)
  response.status(201).json(user)
}

export async function updateUser(request: Request, response: Response) {
  const user = await User.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true }).populate('team')
  if (!user) return response.status(404).json({ message: 'User not found' })
  response.json(user)
}

export async function deleteUser(request: Request, response: Response) {
  const user = await User.findByIdAndDelete(request.params.id)
  if (!user) return response.status(404).json({ message: 'User not found' })
  response.status(204).send()
}