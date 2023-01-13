
import Header from "../../components/Header"
import { Sidebar } from "../global/SideBar"
import { Topbar } from "../global/TopBar"
import { ListUser } from "./ListUser"


export const User = () => {

    return (
        <>
            <Topbar />
            <div className="container">
                <Sidebar />
                <main>
                    <Header title="USUARIO" subtitle="Após o Login, a página principal deve conter uma listagem de usuários gerada a partir da api Random User Generator, a lista deve conter a foto do usuário, nome completo, email, username e idade. " />

                    <ListUser />

                </main>




            </div>
        </>
    )
}