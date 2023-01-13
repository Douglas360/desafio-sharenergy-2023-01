import { FormHelperText, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import Header from "../../components/Header"
import { Sidebar } from "../global/SideBar"
import { Topbar } from "../global/TopBar"

export const Cat = () => {

    const [status, setStatus] = useState("200");
    const [imgSrc, setImgSrc] = useState("https://http.cat/200");

    const handleChange = (e) => {
        setStatus(e.target.value);
        const status = e.target.value;
        const imgSrc = `https://http.cat/${status}`;

        setImgSrc(imgSrc);

    };

    const handleError = () => {
        setImgSrc("https://i.ibb.co/GdZcdzZ/not-found-image-15383864787lu.jpg");
    };


    return (
        <>
            <Topbar />
            <div className="container">
                <Sidebar />
                <main>
                    <Header title="GATO" subtitle="Em uma segunda página, o usuário deve ser capaz de selecionar um status code http qualquer, e, após a seleção, deve ser retornada uma imagem da api HTTP Cat" />
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Select
                            value={status}
                            onChange={handleChange}
                            displayEmpty
                            inputProps={{ "aria-label": "status code" }}
                        >
                            <MenuItem value={"1"}>1</MenuItem>
                            <MenuItem value={"100"}>100</MenuItem>
                            <MenuItem value={"200"}>200</MenuItem>
                            <MenuItem value={"300"}>300</MenuItem>
                            <MenuItem value={"400"}>400</MenuItem>
                            <MenuItem value={"500"}>500</MenuItem>
                        </Select>

                        <FormHelperText>Selecione o status code para carregar a imagem</FormHelperText>

                        <div className="img">
                            <img src={imgSrc} alt='' onError={handleError} />
                        </div>
                    </div>
                </main>




            </div>
        </>
    )
}