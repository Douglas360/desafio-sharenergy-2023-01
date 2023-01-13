import { Button, Modal, TextField, useMediaQuery, useTheme } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Formik } from "formik";
import { tokens } from "../theme";
import * as yup from "yup"
import { useAuth } from "../context/useAuth";
import { Loader } from "./Loader";
/*import { forwardRef } from "react";
import { IMaskInput } from "react-imask";*/

export function CustomerModal({ open, handleClose, title, value }) {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const style = {
        position: 'absolute',
        bgcolor: 'black',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,

    };

    const { loadingRegister, updateCustomer } = useAuth()
    const isNonMobile = useMediaQuery("(min-width:600px)")

    const initialValues = {
        _id: value?._id,
        name: value?.name,
        email: value?.email,
        cpf: value?.cpf,
        phone: value?.phone,
        address: value?.address,

    }
    const checkoutSchema = yup.object().shape({
        name: yup.string().required("obrigatorio"),
        email: yup.string().email("digite um e-mail válido"),
        cpf: yup.string().length(14, 'CPF inválido').required("obrigatorio"),
        phone: yup.string().required("obrigatorio"),
        address: yup.string().required("obrigatorio"),

    })
   /* const PhoneMaskCustom = forwardRef(function TextMaskCustom(props, ref) {
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
    })*/


    /* const handleFormSubmit = (values) => {
         createCustomer(values)
         
     }*/
    const handleFormSubmit = (values) => {
        //createCustomer(values)
        // resetForm()
        updateCustomer(values)
    }


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>

                <Typography variant="h6" component="h2" >
                    {title}
                </Typography>

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
                                    /*InputProps={{
                                        inputComponent: CpfMaskCustom,
                                    }}*/
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
                                   /* InputProps={{
                                        inputComponent: PhoneMaskCustom,
                                    }}*/
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
                                <Button variant="contained" type="submit" sx={{ m: 1, bgcolor: colors.greenAccent[700] }}>Salvar</Button>

                                <Button variant="contained" onClick={handleClose}>Cancelar</Button>
                            </Box>
                        </form>

                    )}
                </Formik>
                {!loadingRegister &&
                    <Loader />
                }



            </Box>
        </Modal>
    )
}