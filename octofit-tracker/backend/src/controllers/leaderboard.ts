import { Request, Response } from 'express'
import Activity from '../models/Activity.js'
import User from '../models/User.js'

export async function getLeaderboard(_request: Request, response: Response) {
  const entries = await Activity.aggregate([
    { $group: { _id: '$user', points: { $sum: '$points' } } },
    { $sort: { points: -1 } },
  ])

  const leaderboard = await Promise.all(
    entries.map(async (entry, index) => ({
      rank: index + 1,
      points: entry.points,
      user: await User.findById(entry._id),
    })),
  )

  response.json(leaderboard)
}