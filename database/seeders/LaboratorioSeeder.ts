
import Hash from '@ioc:Adonis/Core/Hash'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Laboratorio from 'App/Models/Laboratorio'
import User from 'App/Models/User';
export default class extends BaseSeeder {
  public async run () {
    await Laboratorio.query().delete()
    for (let index = 0; index < 3; index++) {
      const user =await User.create({
        email:`user${index+1}@gmail.com`,
        password:(await Hash.make('password'))
      });
      

/*   await  Laboratorio.create({
      designacao:'Sala de aula teorica',
      funciona:'Sim',
      nao_funciona:'Nao',
      total: 10,

    }) */
    for (let index = 0; index < 8; index++) {
    await  Laboratorio.create({
        user_id:user.id,
        designacao:'Sala de aula teorica '+user.email,
        funciona:index/2!=0? 'Sim':'Nao',
        nao_funciona: index/2==0? 'Sim':'Nao',
        total: 10,
      })
      
    }
    // Write your database queries inside the run method
  }    }
}
