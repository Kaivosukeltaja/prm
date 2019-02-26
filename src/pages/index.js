import React from "react"
// import { Helmet } from "react-helmet"
import { graphql } from 'gatsby'
import Link from 'gatsby-link'

export default ({ data }) => {
  const episodes = data.episodes.edges;
  const page = data.page;
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
        <div dangerouslySetInnerHTML={{ __html: page.edges[0].node.html }} />
        <Link to={episode.frontmatter.episodeNumber}>
          {episode.frontmatter.title}
        </Link>
      </div>
    ))}
  </div>
)}

export const pageQuery = graphql`
  query IndexQuery {
    episodes: allMarkdownRemark(
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
            episodeNumber
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
    page: allMarkdownRemark(
      filter: { fileAbsolutePath: {regex: "/index/.*md$/"}}
    ) {
      edges {
        node {
          frontmatter {
            title
          }
          html
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