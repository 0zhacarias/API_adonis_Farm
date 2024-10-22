// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Laboratorio from 'App/Models/Laboratorio'


export default class LaboratoriosController {
    /**
     * index
     */
    public async index({ response }: HttpContextContract) {
        const dados = await Database.from('laboratorios')
        return response.json({
            dados: dados
        })


    }
    /**
     * name
     */
    public async store({ request, response }: HttpContextContract) {
        const { designacao, funciona, nao_funciona, total } = request.body()
        await Laboratorio.create({
            designacao: designacao,
            funciona: funciona,
            nao_funciona: nao_funciona,
            total: total
        })
        return response.json({
            message: "Criado com sucess"
        })
    }
    /**
     * s  name
     */
    public async show({ params, response }: HttpContextContract) {
        const { id } = params
        const lab = await Laboratorio.query()
            .where({ id: id })
            .firstOrFail()

        return response.json(
            { lab: lab }
        )
    }
    /**
     * name
     */
    public async update({ params, request, response }) {
        const { id } = params
        const { designacao, funciona, nao_funciona, total } = request.body()
        const lab = await Laboratorio.query()
            .where({ id: id })
            .firstOrFail()
            lab.merge({
            designacao: designacao,
            funciona: funciona,
            nao_funciona: nao_funciona,
            total: total
        }).save()

        /* await Laboratorio.query()
        .where({id:id})
        .update({
            designacao: designacao,
            funciona: funciona,
            nao_funciona: nao_funciona,
            total: total
        }) */
       return response.json({
        message:"Atualizado com sucesso"
       })
    }
    /**
     * destroy
     */
    public async destroy({params, response}:HttpContextContract) {
        const {id}=params
      //  return response.json({id})
        const lab= await Laboratorio.query().where({id:id}).firstOrFail()
        lab.delete()

        return response.json({
            message:"Laboratorio Eliminado com sucesso"
        })
    }
}
