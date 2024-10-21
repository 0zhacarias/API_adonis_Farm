import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Laboratorio from 'App/Models/Laboratorio'
export default class extends BaseSeeder {
  public async run () {
    await Laboratorio.query().delete()
  await  Laboratorio.create({
      designacao:'Sala de aula teorica',
      funciona:'Sim',
      nao_funciona:'Nao',
      total: 10,

    })
    for (let index = 0; index < 10; index++) {
    await  Laboratorio.create({
        designacao:'Sala de aula teorica '+index,
        funciona:index/2!=0? 'Sim':'Nao',
        nao_funciona: index/2==0? 'Sim':'Nao',
        total: 10,
      })
      
    }
    // Write your database queries inside the run method
  }
}
