import { Request, Response } from "express"
import { CreateUserService } from "../../services/User/CreateUserService"
import { UserType } from "../../types/UserType"

class CreateUserController {
    async create(req: Request, res: Response) {
        try {
            const { username, password } = req.body
            const user = { username, password } as UserType

            const createUserService = new CreateUserService()
            const newUser = await createUserService.execute(user);

            return res.status(201).json(newUser);

        } catch (err) {

            if (err instanceof Error && err.message === 'UserNameRequired') {
                return res.status(400).json({ error: 'User name and Password are required' });
            }

            if (err instanceof Error && err.message === 'userAlreadyExists') {
                return res.status(400).json({ error: 'User already exists' });
            }

            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}
export { CreateUserController }