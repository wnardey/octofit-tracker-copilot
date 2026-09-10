import { Router } from 'express'
import { createTeam, deleteTeam, getTeam, listTeams, updateTeam } from '../controllers/teams.js'

const router = Router()
router.get('/', listTeams)
router.post('/', createTeam)
router.get('/:id', getTeam)
router.patch('/:id', updateTeam)
router.delete('/:id', deleteTeam)
export default router