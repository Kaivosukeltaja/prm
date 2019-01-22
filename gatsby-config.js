module.exports = {
  siteMetadata: {
    title: `Parin Rivin Muutos`,
    siteUrl: `https://prm.houston.io`,
    description: `Suomenkielinen podcast kehityksestä, ketteryydestä ja kaikesta kivasta!`,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages/episodes`,
        name: "episodes",
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [],
      },
    },
  ],
}
