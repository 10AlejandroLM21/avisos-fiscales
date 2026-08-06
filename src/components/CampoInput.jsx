import React from "react";
import TipoCambio from "./TipoCambio";
export default function CampoInput({

    etiqueta,
    obligatorio = false,
    value,
    onChange,
    type = "text",
    placeholder = "",
    disabled = false,
    readOnly = false,
    badge = "",
    badgeColor = "sky",
    className,
    tipoCambio = null,
    onTipoCambio = () => { },
    mostrarTipoCambio = false
}) {
    const colores = {

        emerald: "bg-emerald-100 text-emerald-700",
        amber: "bg-amber-100 text-amber-700",
        sky: "bg-sky-100 text-sky-700",
        red: "bg-red-100 text-red-700",
        gray: "bg-slate-100 text-slate-700"

    };

    return (

        <div className={`w-full ${className}`}>
            <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">

                    {etiqueta}

                    {obligatorio && (
                        <span className="text-red-500 ml-1">*</span>
                    )}

                </label>
                {/* NUEVO */}

                {

                    mostrarTipoCambio ? (

                        tipoCambio === "Incorporación"

                            ? (

                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">

                                    Incorporación

                                </span>

                            )

                            : (

                                <div className="flex rounded-full overflow-hidden border border-slate-300">

                                    <button
                                        type="button"
                                        onClick={() => onTipoCambio("Actualización")}
                                        className={`px-3 py-1 text-xs font-semibold transition

                                ${tipoCambio === "Actualización"

                                                ? "bg-sky-600 text-white"

                                                : "bg-white hover:bg-slate-100"
                                            }

                            `}
                                    >

                                        Actualización

                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => onTipoCambio("Corrección")}
                                        className={`px-3 py-1 text-xs font-semibold transition

                                ${tipoCambio === "Corrección"

                                                ? "bg-amber-500 text-white"

                                                : "bg-white hover:bg-slate-100"
                                            }

                            `}
                                    >

                                        Corrección

                                    </button>

                                </div>

                            )

                    )

                        :

                        (

                            badge &&

                            <span
                                className={`
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-semibold
                    ${colores[badgeColor]}
                `}
                            >

                                {badge}

                            </span>

                        )

                }
            </div>


            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                className={`w-full shadow-md rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500 ${disabled
                    ? "bg-gray-100 cursor-not-allowed text-slate-500"
                    : "bg-white"
                    }`}
            />

        </div>

    );

}