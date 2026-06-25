// components/Input.jsx

export default function Input({
    label,
    type = "text"
}) {
    return (
        <div>
            <label className="block text-sm font-medium mb-1">
                {label}
            </label>

            <input
                type={type}
                className="w-full border rounded-lg px-3 py-2"
            />
        </div>
    );
}