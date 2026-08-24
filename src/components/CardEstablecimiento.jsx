import {
    Building2,
    MapPin,
    Briefcase,
    Eye,
    Check
} from "lucide-react";

export default function CardEstablecimiento({
    establecimiento,
    seleccionado = false,
    onSeleccionar,
    onVer
}) {
    return (
        <div
            className={`
                relative
                overflow-hidden
                rounded-xl
                border
                transition-all
                duration-200
                ${seleccionado
                    ? "border-emerald-500 bg-emerald-50/60 shadow-md ring-1 ring-emerald-200"
                    : "border-slate-200 bg-white hover:border-sky-400 hover:shadow-md"
                }
            `}
        >
            {/* Indicador lateral */}
            <div
                className={`
                    absolute left-0 top-0 bottom-0 w-1
                    ${seleccionado
                        ? "bg-emerald-500"
                        : "bg-slate-200"
                    }
                `}
            />

            <div className="p-5 pl-6">

                {/* Encabezado */}
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                        <div
                            className={`
                                w-10 h-10 rounded-lg flex items-center justify-center
                                ${seleccionado
                                    ? "bg-emerald-100 text-emerald-600"
                                    : "bg-sky-100 text-sky-700"
                                }
                            `}
                        >
                            <Building2 size={20} />
                        </div>

                        <div>
                            <p className="text-xs uppercase tracking-wide text-slate-500">
                                Establecimiento
                            </p>

                            <h3 className="font-semibold text-slate-800">
                                {establecimiento.nombre}
                            </h3>
                        </div>
                    </div>

                    {/* Estado */}
                    {seleccionado && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                            <Check size={14} />
                            Seleccionado
                        </span>
                    )}
                </div>

                {/* Información */}
                <div className="grid md:grid-cols-2 gap-5">

                    {/* Obligación */}
                    <div>
                        <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">
                            Obligación Fiscal
                        </p>

                        <div className="flex items-center gap-2">
                            <Briefcase
                                size={17}
                                className="text-sky-700"
                            />

                            <span className="text-slate-700">
                                {establecimiento.obligacion}
                            </span>
                        </div>
                    </div>

                    {/* Domicilio */}
                    <div>
                        <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">
                            Domicilio
                        </p>

                        <div className="flex items-start gap-2">
                            <MapPin
                                size={17}
                                className="text-sky-700 mt-0.5 shrink-0"
                            />

                            <p className="text-slate-700 leading-6">
                                {establecimiento.domicilio}
                            </p>
                        </div>
                    </div>

                </div>

                {/* Acciones */}
                <div className="mt-6 pt-4 border-t border-slate-200/70 flex justify-end gap-3">

                    <button
                        type="button"
                        onClick={onVer}
                        className="
                            inline-flex items-center gap-2
                            px-4 py-2
                            rounded-lg
                            border border-slate-300
                            bg-white
                            text-slate-700
                            hover:bg-slate-50
                            transition-colors
                        "
                    >
                        <Eye size={17} />
                        Ver domicilio
                    </button>

                    <button
                        type="button"
                        onClick={onSeleccionar}
                        disabled={seleccionado}
                        className={`
                            inline-flex items-center gap-2
                            px-4 py-2
                            rounded-lg
                            text-white
                            transition-colors
                            ${seleccionado
                                ? "bg-emerald-600 cursor-default"
                                : "bg-sky-700 hover:bg-sky-800"
                            }
                        `}
                    >
                        <Check size={17} />

                        {seleccionado
                            ? "Establecimiento seleccionado"
                            : "Seleccionar establecimiento"
                        }
                    </button>

                </div>
            </div>
        </div>
    );
}