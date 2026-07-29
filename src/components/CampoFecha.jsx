export default function CampoFecha({

    etiqueta,
    obligatorio = false,
    value,
    onChange,
    disabled = false,
    readOnly = false,
    min,
    max

}) {

    return (

        <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">

                {etiqueta}

                {obligatorio && (
                    <span className="text-red-500 ml-1">*</span>
                )}

            </label>

            <input
                type="date"
                value={value}
                onChange={onChange}
                disabled={disabled}
                readOnly={readOnly}
                min={min}
                max={max}
                className={`w-full shadow-sm border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500 ${
                    disabled
                        ? "bg-gray-100 cursor-not-allowed text-slate-500"
                        : "bg-white"
                }`}
            />

        </div>

    );

}