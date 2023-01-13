import React, { createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { api, apiUser } from "../services/api"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const autenticado = !!user;
    const [loading, setLoading] = useState(true)
    const [loadingRegister, setLoadingRegister] = useState(true)
    const [loadingDelete, setLoadingDelete] = useState(true)


    useEffect(() => {

        const recoveredUser = localStorage.getItem('user')
        const token = localStorage.getItem('token')

        if (recoveredUser && token) {
            setUser(JSON.parse(recoveredUser))

            api.defaults.headers['Authorization'] = `Bearer ${token}`

        }
        setLoading(false)

    }, [])

    const login = async ({ rememberMe, username, password }) => {
        setLoading(false)

        try {
            const response = await api.post('session', {
                username,
                password
            })

            const usuariologado = response.data
            const token = response.data.token


            api.defaults.headers['Authorization'] = `Bearer ${token}` //Passando token para todas as requisições

            setUser(usuariologado)

            toast.success('Logado com sucesso!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            // Se a opção rememberBe foi habilitada, salva o token em localStorage, se não, salva apenas na sessão
            if (rememberMe) {
                localStorage.setItem("user", JSON.stringify(usuariologado))
                localStorage.setItem("token", token, {
                    path: "/"
                })
            } else {
                sessionStorage.setItem("user", JSON.stringify(usuariologado))
                sessionStorage.setItem("token", token, {
                    path: "/"
                })
            }
            navigate("/user")

        } catch (error) {

            const erro = error.response.data.error
            if (erro === "User not found") {
                toast.error('Usuário não encontrado', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

            } if (erro === "Passwor is incorrect") {
                toast.error('Senha incorreta!', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

            }


        }




    }
    const logout = () => {
        api.defaults.headers.Authorization = null

        localStorage.removeItem('user')
        localStorage.removeItem('token')
        setUser(null)
        navigate("/")
    }
    const createCustomer = async ({ name, email, cpf, phone, address }) => {
        setLoadingRegister(false)

        try {
            await api.post('customer/create', {
                name,
                email,
                cpf,
                phone,
                address
            }).then(() => {
                setLoadingRegister(true)
                toast.success('🦄 Cadastrado com sucesso! ', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            })

        } catch (error) {
            const alreadyExists = error.response.data.error
            if (alreadyExists === "Email already in use") {
                setLoadingRegister(true)
                toast.error('Email já utilizado', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            } if (alreadyExists === "CPF already in use") {
                setLoadingRegister(true)
                toast.error('CPF já cadastrado', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }



            else {
                console.log(error)
            }


        }

    }
    const listCustomer = async () => {
        try {
            const response = await api.get('customer/list')


            return response.data

        } catch (error) {
            console.log(error)
        }
    }
    const updateCustomer = async (updates) => {
        const { name, email, cpf, phone, address } = updates;
        const data = {}
        if (name) data.name = name;
        if (email) data.email = email;
        if (cpf) data.cpf = cpf;
        if (phone) data.phone = phone;
        if (address) data.address = address;
        try {
            await api.patch(`customer/update/${updates._id}`, data);
            toast.success('🦄 Atualizado com sucesso', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            const alreadyExists = error.response.data.error
            if (alreadyExists === "Email already in use") {
                setLoadingRegister(true)
                toast.error('Email já utilizado', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            } if (alreadyExists === "CPF already in use") {
                setLoadingRegister(true)
                toast.error('CPF já cadastrado', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }



            else {
                console.log(error)
            }
        }
    }
    const deleteCustomer = async ({ _id }) => {
        setLoadingDelete(false)
        try {

            const response = await api.delete(`customer/delete/${_id}`,)

            setLoadingDelete(true)
            toast.success('Excluido com sucesso', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,

            })
            return response.data


        } catch (error) {
            setLoadingDelete(true)
            toast.error(' Não foi possivel realizar a exclusão', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,

            })
            console.log(error)
        }
    }
    const listUser = async () => {

        try {

            const response = await apiUser.get(`/api/?results=10`)


            return response.data.results


        } catch (error) {
            console.log(error)
        }
    }


    return (

        <AuthContext.Provider value={{
            autenticado, user, loading, loadingRegister, loadingDelete, login, logout, createCustomer, listCustomer, deleteCustomer, updateCustomer, listUser
        }}>

            {children}
        </AuthContext.Provider>
    )
}


