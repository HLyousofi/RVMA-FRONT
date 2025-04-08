const QuoteStatusButton = ({ status, handleStatusChange }) => {
    return (
      <>
        {status === 'draft' && (
          <button
            onClick={() => handleStatusChange('pending')}
            className="bg-blue-500 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-800 dark:text-white font-medium py-1 px-4 rounded text-sm"
          >
            Envoyer
          </button>
        )}
        {status === 'pending' && (
          <button
            onClick={() => handleStatusChange('approved')}
            className="bg-green-500 hover:bg-green-700 text-white dark:bg-green-600 dark:hover:bg-green-800 dark:text-white font-medium py-1 px-2 rounded text-sm"
          >
            Confirmer
          </button>
        )}
        {status === 'approved' && (
          <button
            onClick={() => handleStatusChange('converted')}
            className="bg-orange-500 hover:bg-orange-700 text-white dark:bg-orange-600 dark:hover:bg-orange-800 dark:text-white font-medium py-1 px-2 rounded text-sm"
          >
            Convertir
          </button>
        )}
      </>
    );
  };
  
  export default QuoteStatusButton;