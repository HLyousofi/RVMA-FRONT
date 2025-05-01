const Badge = ({ status }) => {
    // Define color classes based on status
    const statusStyles = {
      draft: 'bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-300', // Brouillon
      pending: 'bg-blue-300 text-yellow-800 dark:bg-blue-900 dark:text-blue-300', // En attente
      approved: 'bg-green-300 text-green-800 dark:bg-green-900 dark:text-green-300', // Approuvé
      in_progress: 'bg-purple-300 text-purple-800 dark:bg-purple-900 dark:text-purple-300', // En Cours
      completed: 'bg-green-300 text-green-800 dark:bg-green-900 dark:text-green-300', // Approuvé
      to_invoice: 'bg-orange-300 text-orange-800 dark:bg-orange-900 dark:text-orange-300', // Approuvé
      rejected: 'bg-red-300 text-red-800 dark:bg-red-900 dark:text-red-300', // Rejeté
      issued: 'bg-purple-300 text-purple-800 dark:bg-purple-900 dark:text-purple-300', 
      paid: 'bg-green-300 text-green-800 dark:bg-green-900 dark:text-green-300',

    };
  
    // Translate English statuss to French
    const translations = {
      draft: 'Brouillon',
      pending: 'En attente',
      approved: 'Approuvé',
      rejected: 'Rejeté',
      paid: 'Payé',
      issued : 'Emis',
      in_progress : 'En Cours',
      completed : 'Terminer',
      to_invoice : 'Facturé'
    };
  
    // Determine the style and translated status
    const styleClass = statusStyles[status.toLowerCase()] || 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'; // Fallback to blue if status not found
    const translatedLabel = translations[status.toLowerCase()] || status; // Use original label if no translation
  
    return (
      <span className={`${styleClass} text-xs font-medium me-2 px-4 py-1 rounded-full`}>
        {translatedLabel}
      </span>
    );
  };
  
  export default Badge;