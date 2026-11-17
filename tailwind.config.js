module.exports = {
    content: ['./index.html', './assets/js/**/*.js'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['DM Sans', 'sans-serif'],
                display: ['Manrope', 'sans-serif'],
            },
            colors: {
                royal: '#123da8',
                navy: '#092b83',
                ink: '#10224a',
                sun: '#ffd429',
                signal: '#e53232',
                mist: '#f4f7fc',
            },
            boxShadow: {
                card: '0 20px 60px rgba(9, 43, 131, 0.10)',
                glow: '0 18px 55px rgba(18, 61, 168, 0.30)',
            },
        },
    },
};
