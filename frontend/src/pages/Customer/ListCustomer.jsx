import { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material"
import { DataGrid, GridToolbar, GridActionsCellItem, ptBR } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import { tokens } from "../../theme";
import { useAuth } from "../../context/useAuth";
import { Loader } from "../../components/Loader";
import { CustomerModal } from "../../components/CustomerModal";
import { ModalCustom } from "../../components/Modal";


export const ListCustomer = () => {
    const { loadingDelete, listCustomer, deleteCustomer } = useAuth()
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [customer, setCustomer] = useState([])
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [row, setRow] = useState()


    const loadCustomer = async () => {
        const response = await listCustomer()
        setCustomer(response)
    }
    useEffect(() => {
        loadCustomer();
    });


    const handleDeleteOpenModal = (row) => {
        setRow(row)
        setOpen(true)

    }
    const handleEditOpenModal = (row) => {
        setRow(row)
        setOpenEdit(true)

    }

    const handleDelete = async () => {
        try {
            handleClose()
            await deleteCustomer(row)
        } catch (error) {
            console.log(error)

        }

    }

    const handleClose = () => {
        setOpen(false)
        setOpenEdit(false)
    }

    const handleEdit = async () => {
        try {
            //handleClose()
            await console.log(row)
        } catch (error) {
            console.log(error)

        }

    }

    const columns = [
        {
            field: "name",
            headerName: "Nome",
            flex: 1,
            cellClassName: "name-column--cell",
            renderCell: ({ row }) => {
                return (
                    <Typography style={{ cellClassName: "name-column--cell", cursor: 'pointer' }} onClick={() => { handleEditOpenModal(row) }}>
                        {row.name}
                    </Typography>
                )
            }
        },
        {
            field: "email",
            headerName: "EMAIL",
            type: "number",
            headerAlign: "left",
            align: "left",
            flex: 1,
        },
        {
            field: "phone",
            headerName: "Telefone",
            type: "number",
            headerAlign: "left",
            align: "left",
            flex: 1,
        },
        {
            field: "address",
            headerName: "Endereço",
            flex: 1,
        },
        {
            field: "actions",

            headerName: "Ação",
            flex: 1,
            renderCell: ({ row }) => {
                return (
                    <>
                        <GridActionsCellItem

                            icon={<EditIcon />}
                            label="Edit"
                            onClick={() => { handleEditOpenModal(row) }}
                        />
                        <GridActionsCellItem

                            icon={<DeleteIcon />}
                            label="Delete"
                            onClick={() => { handleDeleteOpenModal(row) }}
                        />



                    </>
                )
            }
            ,

        }

    ];
    return (
        <Box m="10px 0 0 0"
            height="50vh"

            sx={{
                "& .MuiDataGrid-root": {
                    border: "none",
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                },
                "& .name-column--cell": {
                    color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.blueAccent[700],
                    borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.blueAccent[700],
                },
                "& .MuiCheckbox-root": {
                    color: `${colors.greenAccent[200]} !important`,
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${colors.grey[100]} !important`,
                },
            }}
        >
            {!loadingDelete &&
                <Loader />}
            <ModalCustom
                open={open}
                title="Deseja realmente excluir ?"
                handleClose={handleClose}
                onConfirm={handleDelete}
            />
            <CustomerModal
                open={openEdit}
                title="Editar cliente ?"
                value={row}
                handleClose={handleClose}
                onConfirm={handleEdit}
            />

            <DataGrid
                rows={customer}
                getRowId={(row) => row._id}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
                localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}

            />



        </Box>
    )
}


