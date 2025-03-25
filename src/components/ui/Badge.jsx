




const Badge  = ({label}) => {

    return(
        // <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-blue-400 border border-blue-400">{label}</span>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-3 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">{label}</span>
    )
}

export default Badge;