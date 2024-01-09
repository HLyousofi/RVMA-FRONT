








function formatPrice(number, locale = 'ma-MA', currency = 'MAD') {
    const formattedPrice = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    }).format(number);

    return formattedPrice;
}

export default formatPrice;