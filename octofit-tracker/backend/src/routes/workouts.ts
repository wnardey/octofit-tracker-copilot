import { Router } from 'express'
import { createWorkout, deleteWorkout, getWorkout, listWorkouts, updateWorkout } from '../controllers/workouts.js'

const router = Router()
router.get('/', listWorkouts)
router.post('/', createWorkout)
router.get('/:id', getWorkout)
router.patch('/:id', updateWorkout)
router.delete('/:id', deleteWorkout)
export default router