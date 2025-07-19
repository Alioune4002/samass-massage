module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://samass-massage.onrender.com/api/:path*',
      },
    ];
  },
};