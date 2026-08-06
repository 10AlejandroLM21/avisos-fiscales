export default function TipoCambio({

    existeDato,
    value,
    onChange

}) {

    if (!existeDato) {

        return (

            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">

                Incorporación

            </span>

        );

    }

    return (

        <div className="inline-flex rounded-lg overflow-hidden border">

            <button
                type="button"
                onClick={() => onChange("Actualización")}
                className={`px-3 py-1 text-xs font-medium transition
                ${
                    value === "Actualización"
                        ? "bg-sky-600 text-white"
                        : "bg-white hover:bg-slate-100"
                }`}
            >
                Actualización
            </button>

            <button
                type="button"
                onClick={() => onChange("Corrección")}
                className={`px-3 py-1 text-xs font-medium transition
                ${
                    value === "Corrección"
                        ? "bg-amber-500 text-white"
                        : "bg-white hover:bg-slate-100"
                }`}
            >
                Corrección
            </button>

        </div>

    );

}