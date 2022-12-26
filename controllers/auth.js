import { response } from 'express'
import bcrypt from 'bcrypt'
import User from '../models/User.js'
import { generateJWT } from '../helpers/jwt.js'

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body

  try {
    let usuario = await User.findOne({ email })

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'An User already exists with that email',
      })
    }

    usuario = new User(req.body)

    //Encriptar Password
    const salt = bcrypt.genSaltSync()
    usuario.password = bcrypt.hashSync(password, salt)

    await usuario.save()

    //Generar JWT
    const token = await generateJWT(usuario.id, usuario.name)

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      masg: 'Please contact Admin',
    })
  }
}

const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body

  try {
    const usuario = await User.findOne({ email })

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'User do not Exist',
      })
    }

    //Confirmar passwords
    const validPassword = bcrypt.compareSync(password, usuario.password)

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Password incorrecto',
      })
    }

    //Gerar JWT
    const token = await generateJWT(usuario.id, usuario.name)

    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    })
  } catch (error) {
    console.log(error)
  }
}

const revalidarToken = async (req, res = response) => {
  const uid = req.uid
  const name = req.name

  const token = await generateJWT(uid, name)

  res.json({
    ok: true,
    token,
  })
}

export { crearUsuario, loginUsuario, revalidarToken }
