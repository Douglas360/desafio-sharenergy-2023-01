
import { Box, Button, TextField, useMediaQuery } from "@mui/material"
import { forwardRef } from "react"
import { IMaskInput } from "react-imask"
import { Formik } from "formik"
import * as yup from "yup"
import Header from "../../components/Header"
import { Sidebar } from "../global/SideBar"
import { Topbar } from "../global/TopBar"
import { useAuth } from "../../context/useAuth"
import { Loader } from "../../components/Loader"
import { ListCustomer } from "./ListCustomer"


export const Customer = () => {

    const { loadingRegister, createCustomer } = useAuth()
    const isNonMobile = useMediaQuery("(min-width:600px)")
    const initialValues = {
        name: "",
        email: "",
        cpf: "",
        phone: "",
        address: "",

    }
    const checkoutSchema = yup.object().shape({
        name: yup.string().required("obrigatorio"),
        email: yup.string().email("digite um e-mail válido"),
        cpf: yup.string().length(14, 'CPF inválido').required("obrigatorio"),
        phone: yup.string().required("obrigatorio"),
        address: yup.string().required("obrigatorio"),

    })
    const PhoneMaskCustom = forwardRef(function TextMaskCustom(props, ref) {
        const { onChange, ...other } = props
        return (
            <IMaskInput
                {...other}
                mask="(#0) 00000-0000"
                definitions={{
                    '#': /[0-9]/,
                }}
                inputRef={ref}
                onAccept={(value) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        )
    })
    const CpfMaskCustom = forwardRef(function TextMaskCustom(props, ref) {
        const { onChange, ...other } = props
        return (
            <IMaskInput
                {...other}
                mask="#00.000.000-00"
                definitions={{
                    '#': /[0-9]/,
                }}
                inputRef={ref}
                onAccept={(value) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        )
    })
 
    const handleFormSubmit = (values, { resetForm }) => {
        createCustomer(values)
        resetForm()
    }

    return (
        <>
            <Topbar />
            <div className="container">
                <Sidebar />

                <main >
                    <Header title="CLIENTES" subtitle="Em uma quarta página, deve haver uma lista de clientes, através da qual o usuário deve ser capaz de cadastrar novos clientes, visualizar informações de um cliente específico, atualizar um cliente e deletar clientes. O cadastro deve possuir nome, email, phone, endereço e cpf." />

                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={initialValues}
                        validationSchema={checkoutSchema}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Box
                                    display="grid"
                                    gap="5px"
                                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                    sx={{
                                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Nome Completo"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.name}
                                        name="name"
                                        error={!!touched.name && !!errors.name}
                                        helperText={touched.name && errors.name}
                                        sx={{ gridColumn: "span 2" }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="CPF"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.cpf}
                                        name="cpf"
                                        error={!!touched.cpf && !!errors.cpf}
                                        helperText={touched.cpf && errors.cpf}
                                        sx={{ gridColumn: "span 1" }}
                                        InputProps={{
                                            inputComponent: CpfMaskCustom,
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Telefone"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.phone}
                                        name="phone"
                                        error={!!touched.phone && !!errors.phone}
                                        helperText={touched.phone && errors.phone}
                                        sx={{ gridColumn: "span 1" }}
                                        InputProps={{
                                            inputComponent: PhoneMaskCustom,
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.email}
                                        name="email"
                                        error={!!touched.email && !!errors.email}
                                        helperText={touched.email && errors.email}
                                        sx={{ gridColumn: "span 2" }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Endereço"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.address}
                                        name="address"
                                        error={!!touched.address && !!errors.address}
                                        helperText={touched.address && errors.address}
                                        sx={{ gridColumn: "span 2" }}
                                    />

                                </Box>
                                <Box display="flex" mt="20px">
                                    <Button type="submit" color="secondary" variant="contained">
                                        Cadastrar
                                    </Button>
                                </Box>
                            </form>
                        )}
                    </Formik>
                    <div>
                        {!loadingRegister &&
                            <Loader />}
                        <ListCustomer />
                    </div>
                </main>





            </div>
        </>
    )
}