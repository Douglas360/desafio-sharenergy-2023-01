
import { User } from "../../models/User"
import { hash } from 'bcryptjs'
import { UserType } from "../../types/UserType";
class CreateUserService {
    async execute({ username, password }: UserType) {
        //Validações com o banco de dados

        const passwordHash = await hash(password, 8)


        if (!username || !password) {
            throw new Error("UserNameRequired");
        }

        const userAlreadyExists = await User.findOne({
            username: username
        })

        if (userAlreadyExists) {
            throw new Error("userAlreadyExists");
        }

        const user = await User.create({
            username: username,
            password: passwordHash
        })

        return user
    }

}
export { CreateUserService }