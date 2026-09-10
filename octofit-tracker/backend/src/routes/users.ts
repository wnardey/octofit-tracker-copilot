import { Router } from 'express'
import { createUser, deleteUser, getUser, listUsers, updateUser } from '../controllers/users.js'

const router = Router()
router.get('/', listUsers)
router.post('/', createUser)
router.get('/:id', getUser)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)
export default router