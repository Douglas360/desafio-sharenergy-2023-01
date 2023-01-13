import { Router } from 'express'
import { CreateUserController } from './controller/User/CreateUserController'
import { AuthUserController } from './controller/User/AuthUserController'
import { CreateCustomerController } from './controller/Customer/CreateCustomerController'
import { ListCustomerController } from './controller/Customer/ListCustomerController'
import { UpdateCustomerController } from './controller/Customer/UpdateCustomerController'
import { DeleteCustomerController } from './controller/Customer/DeleteCustomerController'
import { auth } from './middlewares/auth'

const router = Router()

{/*Rotas para cadastrar e abrir nova session para o usuario */ }
router.post('/user/create', new CreateUserController().create)
router.post('/session', new AuthUserController().auth)

{/*Rotas para CRUD do cliente */ }

router.use(auth)
router.post('/customer/create', new CreateCustomerController().create)
router.get('/customer/list', new ListCustomerController().list)
router.patch('/customer/update/:id', new UpdateCustomerController().update)
router.delete('/customer/delete/:id', new DeleteCustomerController().delete)


export { router }