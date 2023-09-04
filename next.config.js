module.exports = {
    webpack5: true,
    async rewrites() {
        return [
            {
                source: '/',
                destination: '/', // Путь, который будет обработан на клиентской стороне
            },
        ];
    },
    i18n: {
        locales: ['ru', 'kg'],
        defaultLocale: 'ru',
    }
}