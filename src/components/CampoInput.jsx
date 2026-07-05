export default function CampoInput({

    etiqueta,
    obligatorio = false,
    value,
    onChange,
    type = "text",
    placeholder = "",
    disabled = false,
    readOnly = false
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
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                className={`w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500 ${disabled
                    ? "bg-gray-100 cursor-not-allowed text-slate-500 border-slate-200"
                    : "bg-white"
                    }`}
            />

        </div>

    );

}