export default function scroll() {
    const handleScroll = () => {
        const section2 = document.querySelector("#Section2"); // Selecciona el elemento con id "section2"
        section2?.scrollIntoView({ behavior: "smooth" }); // Desplazamiento suave hacia el elemento
    };

    return (
        <button 
            className="bg-blue-700 btn btn-primary" 
            onClick={handleScroll}
        >
            Saber Mas
        </button>
    );
}