import React from "react"
// import { Helmet } from "react-helmet"
import { graphql } from 'gatsby'
import Link from 'gatsby-link'

export default ({ data }) => {
  const episodes = data.allMarkdownRemark.edges;
  return (
  <div>
    { /*
    <Helmet>
      <title>{ data.site.siteMetadata.title }</title>
      <link rel="canonical" href={ data.site.siteMetadata.siteUrl } />
      <meta charSet="utf-8" />
      <meta name="description" content={ data.site.siteMetadata.description } />
    </Helmet> */ }
    { episodes.map(({ node: episode }) => (
      <div key={episode.id}>
        <Link to={episode.fields.slug}>
          {episode.frontmatter.title}
        </Link>
      </div>
    ))}
  </div>
)}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "episode" } }}
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
/*
export const MainPageQuery = graphql`
  query MainPageQuery {
    site {
      siteMetadata {
        title
        siteUrl
        description        
      }
    }
  }
`*/