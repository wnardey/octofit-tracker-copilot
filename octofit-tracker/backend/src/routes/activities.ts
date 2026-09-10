import { Router } from 'express'
import { createActivity, deleteActivity, getActivity, listActivities, updateActivity } from '../controllers/activities.js'

const router = Router()
router.get('/', listActivities)
router.post('/', createActivity)
router.get('/:id', getActivity)
router.patch('/:id', updateActivity)
router.delete('/:id', deleteActivity)
export default router