require("dotenv").config();
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { User } from '../../models/User';
import { UserType } from '../../types/UserType';
class AuthUserService {
    async execute({ username, password }: UserType) {
        //Validações com o banco de dados

        //verifica se existe o usuario
        const user = await User.findOne({
            username: username
        })

        if (!user) {
            throw new Error("UserNotFound");

        }

        //verifica se a senha está correta
        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error("PasswordIncorrect");
        }

        const token = sign(
            {
                username: user.username,

            }, process.env.JWT_SECRET!,

            {
                expiresIn: '30d'
            }

        )


        return {
            id_usuario: user._id,
            username: user.username,
            token: token,

        }
    }

}
export { AuthUserService }