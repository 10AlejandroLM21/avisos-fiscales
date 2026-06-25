export default function CampoInput({

    etiqueta,
    obligatorio = false,
    value,
    onChange,
    type = "text",
    placeholder = ""

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
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none"
            />

        </div>

    );

}