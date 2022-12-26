/* 
  Event Routes
  /api/events
*/

import { Router } from 'express'
import { jwtValidator } from '../middlewares/jwtValidator.js'
import { check } from 'express-validator'
import { fieldValidator } from '../middlewares/fieldValidator.js'
import {
  actualizarEvento,
  crearEvento,
  eliminarEvento,
  getEeventos,
} from '../controllers/events.js'

const router = Router()

router.use(jwtValidator)

router.get('/', getEeventos)
router.post(
  '/',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').isDate(),
    check('end', 'Fecha de finalizacion es obligatoria').isDate(),
    fieldValidator,
  ],
  crearEvento
)
router.put(
  '/:id',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').isDate(),
    check('end', 'Fecha de finalizacion es obligatoria').isDate(),
    fieldValidator,
  ],
  actualizarEvento
)
router.delete('/:id', eliminarEvento)

export default router
