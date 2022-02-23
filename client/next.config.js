const withPWA = require('next-pwa')

module.exports = withPWA({
    images: {
        domains: [
            'localhost',
            'm.media-amazon.com',
            'ia.media-imdb.com',
            'film-reviews-express.herokuapp.com',
        ],
    },
    pwa: {
        dest: 'public',
        disable: process.env.NODE_ENV === 'development',
    },
})
