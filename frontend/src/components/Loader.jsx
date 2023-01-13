import spiner from '../assets/load.svg'
export function Loader() {
    return (
        <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            left: '50%',
            top:'50%',
            position: 'absolute',
            transform: 'translate(-50%, -50%)'
        }}>
            <img src={spiner} alt="" width="5%" />
        </div>
    )


}