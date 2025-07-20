import FormatIndentDecreaseIcon from '@mui/icons-material/FormatIndentDecrease';
import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease';






const SidebarButton = ({toggleSidebar, isOpen}) =>{
    
    return (
        
        <button
            onClick={toggleSidebar}
            className=" text-gray-600 dark:text-gray-200 hover:text-blue-600"
            >
                { isOpen ? <FormatIndentDecreaseIcon fontSize="large" /> : <FormatIndentIncreaseIcon fontSize="large" /> }
        </button>
        
    )
}

export default SidebarButton;