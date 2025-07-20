








function formatPrice(number, locale = 'ma-MA', currency = 'MAD') {
    const formatted = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    }).format(number);

    // Remplacer la position du symbole MAD en le mettant à droite
    const currencySymbol = currency; // Dans cet exemple, "MAD"
    const numberOnly = formatted.replace(currencySymbol, '').trim();
    return `${numberOnly} ${currencySymbol}`;
}
export default formatPrice;


export const calculateTTC = (amountHT, taxRate = 0.20) => {
    if (typeof amountHT !== 'number' || isNaN(amountHT)) {
      console.error('Le montant HT doit être un nombre valide');
      return 0;
    }
    if (typeof taxRate !== 'number' || isNaN(taxRate)) {
      console.error('Le taux de taxe doit être un nombre valide');
      return amountHT; // Retourne HT si le taux est invalide
    }
  
    const taxAmount = amountHT * taxRate; // Montant de la taxe
    const amountTTC = amountHT + taxAmount; // Montant TTC
    return Number(amountTTC.toFixed(2)); // Arrondi à 2 décimales
  };