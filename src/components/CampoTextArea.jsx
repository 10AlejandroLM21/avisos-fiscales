import React from "react";

export default function CampoTextArea({
    etiqueta,
    obligatorio = false,
    value,
    onChange,
    placeholder = "",
    disabled = false,
    readOnly = false,
    badge = "",
    badgeColor = "sky",
    className = "",
    rows = 5,
    maxLength,
}) {
    const colores = {
        emerald: "bg-emerald-100 text-emerald-700",
        amber: "bg-amber-100 text-amber-700",
        sky: "bg-sky-100 text-sky-700",
        red: "bg-red-100 text-red-700",
        gray: "bg-slate-100 text-slate-700",
    };

    return (
        <div className={`w-full ${className}`}>

            <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-slate-700">
                    {etiqueta}

                    {obligatorio && (
                        <span className="text-red-500 ml-1">*</span>
                    )}
                </label>

                {badge && (
                    <span
                        className={`
                            px-3 py-1
                            rounded-full
                            text-xs
                            font-semibold
                            ${colores[badgeColor]}
                        `}
                    >
                        {badge}
                    </span>
                )}
            </div>

            <textarea
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                rows={rows}
                maxLength={maxLength}
                className={`
                    w-full
                    shadow-md
                    rounded-lg
                    px-4
                    py-3
                    border
                    outline-none
                    resize-y
                    focus:ring-2
                    focus:ring-sky-500
                    ${
                        disabled
                            ? "bg-gray-100 cursor-not-allowed text-slate-500"
                            : "bg-white border-slate-300"
                    }
                `}
            />

            {maxLength && (
                <div className="text-right text-xs text-slate-400 mt-1">
                    {value?.length || 0}/{maxLength}
                </div>
            )}
        </div>
    );
}