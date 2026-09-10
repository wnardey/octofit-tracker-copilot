import mongoose from 'mongoose'
import { connectDatabase } from '../config/database.js'
import Activity from '../models/Activity.js'
import Leaderboard from '../models/Leaderboard.js'
import Team from '../models/Team.js'
import User from '../models/User.js'
import Workout from '../models/Workout.js'

async function seedDatabase(): Promise<void> {
  await connectDatabase()

  await Promise.all([
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Team.deleteMany({}),
    User.deleteMany({}),
    Workout.deleteMany({}),
  ])

  const users = await User.create([
    { username: 'alex.runner', email: 'alex.runner@example.com', name: 'Alex Rivera', profile: 'Distance running and endurance' },
    { username: 'jamie.strength', email: 'jamie.strength@example.com', name: 'Jamie Chen', profile: 'Strength training and mobility' },
    { username: 'sam.cyclist', email: 'sam.cyclist@example.com', name: 'Sam Taylor', profile: 'Cycling and outdoor activities' },
    { username: 'taylor.yoga', email: 'taylor.yoga@example.com', name: 'Taylor Morgan', profile: 'Yoga and recovery' },
  ])

  const teams = await Team.create([
    {
      name: 'Peak Performers',
      description: 'A team focused on endurance and consistent progress.',
      members: [users[0]._id, users[1]._id],
    },
    {
      name: 'Trail Blazers',
      description: 'A team for outdoor movement and active recovery.',
      members: [users[2]._id, users[3]._id],
    },
  ])

  await User.bulkWrite([
    { updateOne: { filter: { _id: users[0]._id }, update: { team: teams[0]._id } } },
    { updateOne: { filter: { _id: users[1]._id }, update: { team: teams[0]._id } } },
    { updateOne: { filter: { _id: users[2]._id }, update: { team: teams[1]._id } } },
    { updateOne: { filter: { _id: users[3]._id }, update: { team: teams[1]._id } } },
  ])

  const activities = await Activity.create([
    { user: users[0]._id, type: 'running', duration: 45, distance: 7.2, calories: 520, points: 72, completedAt: new Date('2026-09-05') },
    { user: users[0]._id, type: 'running', duration: 30, distance: 4.8, calories: 350, points: 48, completedAt: new Date('2026-09-08') },
    { user: users[1]._id, type: 'strength', duration: 50, calories: 410, points: 65, completedAt: new Date('2026-09-06') },
    { user: users[1]._id, type: 'walking', duration: 35, distance: 3.1, calories: 210, points: 31, completedAt: new Date('2026-09-09') },
    { user: users[2]._id, type: 'cycling', duration: 60, distance: 18.5, calories: 610, points: 88, completedAt: new Date('2026-09-04') },
    { user: users[2]._id, type: 'cycling', duration: 40, distance: 12.2, calories: 430, points: 58, completedAt: new Date('2026-09-07') },
    { user: users[3]._id, type: 'yoga', duration: 30, calories: 150, points: 35, completedAt: new Date('2026-09-05') },
    { user: users[3]._id, type: 'walking', duration: 25, distance: 2.2, calories: 160, points: 22, completedAt: new Date('2026-09-08') },
  ])

  await Leaderboard.create([
    { user: users[2]._id, points: 146, rank: 1 },
    { user: users[0]._id, points: 120, rank: 2 },
    { user: users[1]._id, points: 96, rank: 3 },
    { user: users[3]._id, points: 57, rank: 4 },
  ])

  const workouts = await Workout.create([
    {
      title: 'Foundation Run',
      description: 'A steady run for building aerobic endurance.',
      difficulty: 'beginner',
      duration: 30,
      exercises: ['Warm-up walk', 'Easy run', 'Cool-down stretch'],
      target: 'Endurance',
    },
    {
      title: 'Full Body Circuit',
      description: 'A balanced strength circuit using bodyweight movements.',
      difficulty: 'intermediate',
      duration: 40,
      exercises: ['Squats', 'Push-ups', 'Reverse lunges', 'Plank'],
      target: 'Strength',
    },
    {
      title: 'Mobility Flow',
      description: 'A controlled sequence for mobility and recovery.',
      difficulty: 'beginner',
      duration: 25,
      exercises: ['Cat-cow', 'World\'s greatest stretch', 'Low lunge', 'Child\'s pose'],
      target: 'Recovery',
    },
  ])

  console.log(`Seeded ${users.length} users, ${teams.length} teams, ${activities.length} activities, ${workouts.length} workouts, and 4 leaderboard entries.`)
}

seedDatabase()
  .catch((error: unknown) => {
    console.error('Error seeding database:', error)
    process.exitCode = 1
  })
  .finally(async () => {
    await mongoose.disconnect()
  })
