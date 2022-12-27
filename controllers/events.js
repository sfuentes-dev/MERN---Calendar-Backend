import { response } from 'express'
import Evento from '../models/Evento.js'

const getEeventos = async (req, res = response) => {
  const eventos = await Evento.find().populate('user', 'name')

  try {
    return res.status(200).json({
      ok: true,
      eventos,
    })
  } catch (error) {
    console.log(error)
  }
}

const crearEvento = async (req, res = response) => {
  const evento = new Evento(req.body)

  try {
    evento.user = req.uid

    const eventoGuardado = await evento.save()

    res.json({
      ok: true,
      evento: eventoGuardado,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}

const actualizarEvento = async (req, res = response) => {
  const eventoId = req.params.id
  const uid = req.uid

  try {
    const evento = await Evento.findById(eventoId)

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe por ese Id',
      })
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de editar este evento',
      })
    }

    const nuevoEvento = {
      ...req.body,
      user: uid,
    }

    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    )

    res.json({
      ok: true,
      evento: eventoActualizado,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}
const eliminarEvento = async (req, res = response) => {
  const eventoId = req.params.id
  const uid = req.uid

  try {
    const evento = await Evento.findById(eventoId)

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe por ese Id',
      })
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de editar este evento',
      })
    }

    await Evento.findByIdAndDelete(eventoId)

    res.json({
      ok: true,
      msg: 'Evento Eliminado',
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}

export { getEeventos, crearEvento, actualizarEvento, eliminarEvento }
