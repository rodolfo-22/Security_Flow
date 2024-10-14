import profile from "../assets/profile.png"
import { usePopup } from "./PopupContext";

const VisitCard = () => {
    const { showPopup } = usePopup();

    const handleRevoke = () => {
        // Aquí puedes agregar la lógica para revocar la visita
        // Después de completar la lógica, muestra el mensaje de éxito
        showPopup("Removido exitosamente", true);
    };

    return (
        <div className="bg-[#D9D9D9] bg-opacity-52 p-2 rounded-md flex flex-col sm:flex-row justify-center items-center m-2 w-auto font-roboto_mono">
            <img className="w-10 h-10 sm:mr-5 m-1" src={profile} alt="profile" />
            <div className="flex flex-col justify-center items-center sm:mr-5 m-1">
                <p className="pt-1 text-center">Carlos Sosa</p>
                <p className="pt-1 text-center">24/11/2024</p>
                <p className="pt-1 text-center">11:20 AM</p>
            </div>
            <div className="flex justify-center items-center">
                <button className="rounded-md bg-[#F79E9E] p-2 m-1" onClick={handleRevoke}>Revocar</button>
            </div>
        </div>

    );
}

export default VisitCard;