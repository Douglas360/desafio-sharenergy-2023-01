
import { useState } from "react";
import { Sidebar } from "../global/SideBar"
import { Topbar } from "../global/TopBar"
import Header from "../../components/Header";
import { useEffect } from "react";

export const Dog = () => {
    const [imgSrc, setImgSrc] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const res = await fetch('https://random.dog/woof.json');
                const data = await res.json();
                const imageUrl = data.url;
                setImgSrc(imageUrl);
            } catch (error) {
                console.log(error);
            }
        };
        fetchImage();
    }, []);



    const handleClick = async () => {
        try {
            const res = await fetch('https://random.dog/woof.json');
            const data = await res.json();
            const imageUrl = data.url;
            setImgSrc(imageUrl);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Topbar />
            <div className="Dog-container">
                <Sidebar />

                <main >
                    <Header title="RANDOM DOG" subtitle="Em uma terceira página, deve haver um botão de refresh que, ao ser clicado, deve retornar uma imagem aleatória da api Random Dog;" />

                    <div className="btn">
                        <button onClick={handleClick}>Atualizar</button>


                    </div>
                    <div className="img">
                        <img src={imgSrc} alt="" />

                    </div>
                </main>

            </div>
        </>
    )
}