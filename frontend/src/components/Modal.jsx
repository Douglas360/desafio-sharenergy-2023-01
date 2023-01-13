import { Button, Modal, useTheme } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { tokens } from "../theme";

export function ModalCustom({ open, handleClose, title, description, onConfirm }) {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 250,
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,

    };


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
                <Button variant="contained" onClick={onConfirm} sx={{ m: 1, bgcolor: colors.greenAccent[700] }}>Sim</Button>

                <Button variant="contained" onClick={handleClose}>Cancelar</Button>

            </Box>
        </Modal>
    )
}