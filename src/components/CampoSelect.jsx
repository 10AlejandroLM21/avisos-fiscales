export default function CampoSelect({
  etiqueta,
  obligatorio = false,
  value,
  onChange,
  opciones = [],
  disabled = false
}) {
  return (
    <div>

      <label className="block text-sm font-medium text-slate-700 mb-2">
        {etiqueta}

        {obligatorio && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>

      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full rounded-lg border border-slate-300 bg-white px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition
        ${disabled
            ? 'bg-gray-100 cursor-not-allowed text-slate-500 border-slate-200'
            : 'bg-white'
          }`
      }>

        {opciones.map((opcion) => (
          <option
            key={opcion.value}
            value={opcion.value}
          >
            {opcion.label}
          </option>
        ))}

      </select>

    </div>
  );
}