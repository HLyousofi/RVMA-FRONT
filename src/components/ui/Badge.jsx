const Badge = ({ label }) => {
    // Define color classes based on status
    const statusStyles = {
      draft: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300', // Brouillon
      pending: 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300', // En attente
      approved: 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-300', // Approuvé
      rejected: 'bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-300', // Rejeté
    };
  
    // Translate English labels to French
    const translations = {
      draft: 'Brouillon',
      pending: 'En attente',
      approved: 'Approuvé',
      rejected: 'Rejeté',
    };
  
    // Determine the style and translated label
    const styleClass = statusStyles[label.toLowerCase()] || 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'; // Fallback to blue if label not found
    const translatedLabel = translations[label.toLowerCase()] || label; // Use original label if no translation
  
    return (
      <span className={`${styleClass} text-xs font-medium me-2 px-3 py-1 rounded-full`}>
        {translatedLabel}
      </span>
    );
  };
  
  export default Badge;