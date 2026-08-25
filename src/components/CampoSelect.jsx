export default function CampoSelect({
  etiqueta,
  obligatorio = false,
  value,
  onChange,
  opciones = [],
  disabled = false,
  readOnly = false,
  className
}) {
  return (
    <div className={`w-full ${className}`}>

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
        readOnly={readOnly}
        className={`
    w-full
    rounded-lg
    shadow-md
    px-4
    py-3
    outline-none
    border
    transition
    focus:ring-2
    focus:ring-sky-500
    focus:border-sky-500
    ${disabled
            ? "bg-slate-100 border-slate-300 text-slate-500 cursor-not-allowed"
            : "bg-white border-slate-300"
          }
  `}
      >

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