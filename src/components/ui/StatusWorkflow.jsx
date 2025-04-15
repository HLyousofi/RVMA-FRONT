const STATUS_STEPS = {
  quote: [
    { id: 1, label: 'Brouillon', status: 'draft' },
    { id: 2, label: 'En attente', status: 'pending' },
    { id: 3, label: 'Approuvé', status: 'approved' }
  ],
  order: [
    { id: 1, label: 'En attente', status: 'pending' },
    { id: 2, label: 'En cours', status: 'in_progress' },
    { id: 3, label: 'Terminé', status: 'completed' },
    { id: 4, label: 'Facturé', status: 'to_invoice' }
  ],
  invoice: [
    { id: 1, label: 'Brouillon', status: 'draft' },
    { id: 2, label: 'Émise', status: 'issued' },
    { id: 3, label: 'Payée', status: 'paid' }
  ]
};

const StatusWorkflow = ({ currentStatus, type = 'quote' }) => {
  // Sélectionner les étapes selon le type
  const steps = STATUS_STEPS[type] || STATUS_STEPS.quote; // Fallback vers 'quotes' si type invalide

  // Trouver l'index de l'étape active
  const activeStepIndex = steps.findIndex(step => step.status === currentStatus);

  return (
    <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-xs dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-2 sm:space-x-4 rtl:space-x-reverse">
      {steps.map((step, index) => (
        <li
          key={step.id}
          className={`flex items-center ${
            index <= activeStepIndex
              ? 'text-blue-600 dark:text-blue-500'
              : ''
          }`}
        >
          {/* Numéro de l'étape */}
          <span
            className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ${
              index <= activeStepIndex
                ? 'border-blue-700 dark:border-blue-500'
                : 'border-gray-500 dark:border-gray-400'
            }`}
          >
            {step.id}
          </span>

          {/* Label */}
          {step.label}
          <span className="hidden sm:inline-flex sm:ms-2"></span>

          {/* Flèche (sauf pour la dernière étape) */}
          {index < steps.length - 1 && (
            <svg
              className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 12 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m7 9 4-4-4-4M1 9l4-4-4-4"
              />
            </svg>
          )}
        </li>
      ))}
    </ol>
  );
};

export default StatusWorkflow;