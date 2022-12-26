/*
  Rutas de usuarios / Auth
  host + /api/auth
*/
import { Router } from 'express'
import { check } from 'express-validator'
import { fieldValidator } from '../middlewares/fieldValidator.js'
import { jwtValidator } from '../middlewares/jwtValidator.js'

import {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} from '../controllers/auth.js'

const router = Router()

router.post(
  '/new',
  [
    check('name', 'Name is Required').not().isEmpty(),
    check('email', 'Email is Required').isEmail(),
    check('password', 'Password 6 characters').isLength({ min: 6 }),
    fieldValidator,
  ],
  crearUsuario
)

router.post(
  '/',
  [
    check('email', 'Email is Required').isEmail(),
    check('password', 'Password 6 characters').isLength({ min: 6 }),
    fieldValidator,
  ],
  loginUsuario
)

router.get('/renew', jwtValidator, revalidarToken)

export default router
