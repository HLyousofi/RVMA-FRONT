    export const STATUS_CONFIG = {
    quote: {
      draft: {
        nextStatus: 'pending',
        label: 'Envoyer',
        baseColor: 'blue'
      },
      pending: {
        nextStatus: 'approved',
        label: 'Approuver',
        baseColor: 'green'
      },
      approved: {
        nextStatus: 'converted', // Statut final
        label: 'Converter',
        baseColor: 'gray' // Pas de bouton actif
      }
    },
    order: {
      pending: {
        nextStatus: 'in_progress',
        label: 'Démarrer',
        baseColor: 'purple'
      },
      in_progress: {
        nextStatus: 'completed',
        label: 'Terminer',
        baseColor: 'teal'
      },
      completed: {
        nextStatus: 'to_invoice', // Statut final
        label: 'Créer une facture',
        baseColor: 'blue' // Pas de bouton actif
      },
      to_invoice: {
        nextStatus: '', // Statut final
        label: 'Facturé',
        baseColor: 'gray' // Pas de bouton actif
      }
  
    },
    invoice: {
      draft: {
        nextStatus: 'issued',
        label: 'Émettre',
        baseColor: 'orange'
      },
      issued: {
        nextStatus: 'paid',
        label: 'Marquer comme payée',
        baseColor: 'yellow'
      },
      paid: {
        nextStatus: null, // Statut final
        label: 'Terminé',
        baseColor: 'gray' // Pas de bouton actif
      }
    }
    };

  export const COLOR_CLASSES = {
    blue: "bg-blue-400 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-800",
    green: "bg-green-400 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-800",
    gray: "bg-gray-400 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-800",
    purple: "bg-purple-400 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-800",
    teal: "bg-teal-400 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-800",
    orange: "bg-orange-400 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-800",
    yellow: "bg-yellow-400 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-800",
  };