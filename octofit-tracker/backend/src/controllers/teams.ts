import { Request, Response } from 'express'
import Team from '../models/Team.js'

export async function listTeams(_request: Request, response: Response) {
  response.json(await Team.find().populate('members').sort({ createdAt: -1 }))
}

export async function getTeam(request: Request, response: Response) {
  const team = await Team.findById(request.params.id).populate('members')
  if (!team) return response.status(404).json({ message: 'Team not found' })
  response.json(team)
}

export async function createTeam(request: Request, response: Response) {
  const team = await Team.create(request.body)
  response.status(201).json(await team.populate('members'))
}

export async function updateTeam(request: Request, response: Response) {
  const team = await Team.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true }).populate('members')
  if (!team) return response.status(404).json({ message: 'Team not found' })
  response.json(team)
}

export async function deleteTeam(request: Request, response: Response) {
  const team = await Team.findByIdAndDelete(request.params.id)
  if (!team) return response.status(404).json({ message: 'Team not found' })
  response.status(204).send()
}