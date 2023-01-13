import { Avatar, Box, useTheme } from "@mui/material"
import { DataGrid, GridToolbar, ptBR } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { useAuth } from "../../context/useAuth"
import { tokens } from "../../theme"

export const ListUser = () => {
    const { listUser } = useAuth()
    const [user, SetUser] = useState([])
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);



    const loadUser = async () => {
        const response = await listUser()
        const users = response.map(user => {
            return {
                ...user,
                firstName: `${user.name.first} ${user.name.last} `,
                username: user.login.username,
                age: user.dob.age

            }
        })
        SetUser(users)
    }

    useEffect(() => {
        loadUser();
    }, []);

    const columns = [
        {
            field: "picture.thumbnail",
            headerName: "Foto",
            flex: .3,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }) => {
                return (
                    <Avatar alt={row.name.first} src={row.picture.thumbnail} />
                )

            }
        },
        {
            field: "firstName",
            headerName: "Nome",
            flex: 1,
            cellClassName: "name-column--cell",

        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "username",
            headerName: "Usuário",
            flex: 1,

        },
        {
            field: "age",
            headerName: "Idade",
            flex: 1,

        }
    ]

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


            <DataGrid
                rows={user}
                getRowId={(row) => row.email}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
                localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}


            />

        </Box>


    )

}