import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Eye,
    Pencil,
    X,
    Search
} from "lucide-react";

const iconos = {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Eye,
    Pencil,
    X,
    Search
};

export default function BotonesNavegacion({

    izquierda = [],
    derecha = []

}) {

    const renderBoton = (boton, index) => {

        const Icono = iconos[boton.icono];

        return (

            <button
                key={index}
                onClick={boton.onClick}
                disabled={boton.disabled}
                className={`
                    inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition shadow-sm
                    ${boton.className}
                    ${boton.disabled ? "opacity-50 cursor-not-allowed" : ""}
                `}
            >

                {Icono && <Icono size={18} />}

                {boton.etiqueta}

            </button>

        );

    };

    return (

        <div className="sticky bottom-0 bg-white rounded-2xl border shadow-sm mt-4">

            <div className="px-6 py-5 flex justify-between items-center">

                <div className="flex gap-3">

                    {izquierda.map(renderBoton)}

                </div>

                <div className="flex gap-3">

                    {derecha.map(renderBoton)}

                </div>

            </div>

        </div>

    );

}