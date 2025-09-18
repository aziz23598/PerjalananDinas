export default function Selectbox({
    className = "",
    options = [],
    currentValue = "",
    ...props
}) {
    return (
        <select
            {...props}
            value={currentValue} // PERBAIKAN: Ganti defaultValue dengan value
            className={
                "rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 mt-1 block w-full" +
                className
            }
        >
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}