const path = require(`path`);

module.exports = {
  siteMetadata: {
    title: `Created by Muhammad Uzair`,
    description: `GatsBy Clean Boiler Plate.`,
    author: `Muhammad Uzair`,
  },
  plugins: [
    `gatsby-plugin-material-ui`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
    },
  ],
};
