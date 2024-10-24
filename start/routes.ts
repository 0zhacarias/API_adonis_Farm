/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import { HttpContext } from '@adonisjs/core/build/standalone'
import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database'
import AuthController from 'App/Controllers/Http/AuthController'
Route.get('/', async ({response}:HttpContext) => {
  const datas= await Database.from('laboratorios')
  return response.json({
      datas:datas
  })
}).middleware('auth')
Route.get('index', 'LaboratoriosController.index')
Route.post('store','LaboratoriosController.store')
Route.get('/show/:id','LaboratoriosController.show')
Route.put('update/:id','LaboratoriosController.update')
Route.delete('destroy/:id','LaboratoriosController.destroy')
Route.post("registrar",'AuthController.registrar')
Route.post("login","AuthController.login")
Route.post('logout','AuthController.logout').middleware('auth')
