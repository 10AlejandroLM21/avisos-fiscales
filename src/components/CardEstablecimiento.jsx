import {
    Building2,
    MapPin,
    Briefcase,
    Eye,
    Check,
    Repeat
} from "lucide-react";

export default function CardEstablecimiento({
    establecimiento,
    seleccionado = false,
    onSeleccionar,
    onCambiar,
    onVer
}) {

    return (

        <div
            className={`
                relative
                flex
                overflow-hidden
                rounded-xl
                border
                transition-all
                ${seleccionado
                    ? "border-red-500 bg-red-50 shadow-sm"
                    : "border-slate-200 bg-white hover:border-sky-500 hover:shadow-md"
                }
            `}
        >

            {/* Indicador */}

            <div
                className={`w-2 ${seleccionado
                    ? "bg-red-600"
                    : "bg-slate-300"
                    }`}
            />

            <div className="flex-1 p-5">

                {seleccionado && (

                    <div className="mb-5">

                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">

                            <Check size={14} />

                            Establecimiento Seleccionado

                        </span>

                    </div>

                )}

                <div className="grid md:grid-cols-2 gap-5">

                    <div>

                        <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">
                            Nombre del Establecimiento
                        </p>

                        <div className="flex items-center gap-2">

                            <Building2
                                size={18}
                                className="text-sky-700"
                            />

                            <span className="font-semibold text-slate-800">
                                {establecimiento.nombre}
                            </span>

                        </div>

                    </div>

                    <div>

                        <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">
                            Obligación Fiscal
                        </p>

                        <div className="flex items-center gap-2">

                            <Briefcase
                                size={18}
                                className="text-sky-700"
                            />

                            <span className="text-slate-700">
                                {establecimiento.obligacion}
                            </span>

                        </div>

                    </div>

                </div>

                <div className="mt-5">

                    <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">
                        Domicilio
                    </p>

                    <div className="flex gap-2">

                        <MapPin
                            size={18}
                            className="text-sky-700 mt-0.5"
                        />

                        <p className="text-slate-700 leading-6">
                            {establecimiento.domicilio}
                        </p>

                    </div>

                </div>

                <div className="mt-6 flex justify-end gap-3">

                    <button
                        type="button"
                        onClick={onVer}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-slate-50"
                    >

                        <Eye size={18} />

                        Ver domicilio

                    </button>

                    {seleccionado ? (

                        <button
                            type="button"
                            onClick={onCambiar}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-800"
                        >

                            <Repeat size={18} />

                            Seleccionar otro establecimiento

                        </button>

                    ) : (

                        <button
                            type="button"
                            onClick={onSeleccionar}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-700 text-white hover:bg-sky-800"
                        >

                            <Check size={18} />

                            Seleccionar establecimiento

                        </button>

                    )}

                </div>

            </div>

        </div>

    );

} 