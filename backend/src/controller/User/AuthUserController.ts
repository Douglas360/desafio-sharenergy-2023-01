import { Request, Response } from "express";
import { AuthUserService } from "../../services/User/AuthUserService";
import { UserType } from "../../types/UserType";
class AuthUserController {
    async auth(req: Request, res: Response) {
        const { username, password } = req.body
        const user = { username, password } as UserType


        const authUserService = new AuthUserService()

        try {
            const session = await authUserService.execute(user)

            return res.status(201).json(session);

        } catch (error) {

            if (error instanceof Error && error.message === 'UserNotFound') {
                return res.status(400).json({ error: 'User not found' });
            }

            if (error instanceof Error && error.message === 'PasswordIncorrect') {
                return res.status(400).json({ error: 'Passwor is incorrect' });
            }

            return res.status(500).json({ error: 'Internal server error' });
        }

    }

}
export { AuthUserController }