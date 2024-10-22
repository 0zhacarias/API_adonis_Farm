import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

export default class AuthController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}

  public async registrar({request, response, auth}: HttpContextContract) {
    const {email, password}=request.body()
   // return response.json(request.body())
    const Auser=await User.query().where({email:email}).first()
    if (Auser) {
      return response.status(422).json({message:"Email existente"})
    } 
    const hashedPassword = await Hash.make(password)
    const  user=await User.create({
      email:email,
      password:hashedPassword

    })
    const token = await auth.use('api').generate(user,{ expiresIn: '10 mins'})
    return response.json({
      user:user,
      token:token
    })
  }
  public async login({request, response, auth}:HttpContextContract){
    const {email,password}=request.body()
    const user =await User.query().where({email:email}).first()
    if (!user) {
      return response.status(422).json({message:"Email não existe"})
    }
    if (!(await Hash.verify(user.password, password))) {
      return response.unauthorized('Credenciais Invalida')
    }
    const token = await auth.use('api').generate(user)
    return response.json({
      data:{
        user:user,
        token:token
      }
    })
  }
}
