import express from 'express'
import activityRoutes from './routes/activities.js'
import leaderboardRoutes from './routes/leaderboard.js'
import teamRoutes from './routes/teams.js'
import userRoutes from './routes/users.js'
import workoutRoutes from './routes/workouts.js'

const app = express()

app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' })
})

app.use('/api/users', userRoutes)
app.use('/api/teams', teamRoutes)
app.use('/api/activities', activityRoutes)
app.use('/api/leaderboard', leaderboardRoutes)
app.use('/api/workouts', workoutRoutes)

app.use((_request, response) => {
  response.status(404).json({ message: 'Resource not found' })
})

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error)
  response.status(500).json({ message: 'Internal server error' })
})

export default app