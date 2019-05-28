import React from "react"
import { Container, Row, Col } from 'reactstrap'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'
import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../static/css/styles.css'

const Page = styled.div`
  background-color: #000;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  color: #ffffff; 
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 80em;
  background-color: #333;
`;

const NavBar = styled.nav`
  display: flex;
  padding: 1em;
  align-items: center;
`;

const NavBarBg = styled.div`
  background-color: #B4EB45;
  background-image: linear-gradient(to right, #B4EB45, #7ED321);
`;

const MainContent = styled.div`
  padding: 2rem 1rem;
`;

const MainContentBg = styled.div`
  background-color: #333333;
`;

const Sidebar = styled.aside`
  background-color: #333333;
  padding: 2rem 1rem;
`;

const EpisodeList = styled.div`
  border: 1px solid #ffffff;
  padding: 1em;
`;

const Column = styled.div`
  display: flex;
`;

export default ({ data }) => {
  const episodes = data.episodes.edges;
  const page = data.page;
  return (
    <Page>
      { /*
      <Helmet>
        <title>{ data.site.siteMetadata.title }</title>
        <link rel="canonical" href={ data.site.siteMetadata.siteUrl } />
        <meta charSet="utf-8" />
        <meta name="description" content={ data.site.siteMetadata.description } />
      </Helmet> */ }
      <Container>
        <NavBarBg>
          <Row>
            <Col>
              <NavBar>
                <p>Parin Rivin Muutos</p>
              </NavBar>
            </Col>
          </Row>
        </NavBarBg>
        <MainContentBg>
          <Row>
            <Col sm="8">
              <MainContent>
                <div dangerouslySetInnerHTML={{ __html: page.edges[0].node.html }} />
                <EpisodeList>
                  { episodes.map(({ node: episode }) => (
                    <div key={episode.id}>
                      <Link to={"/" + episode.frontmatter.episodeNumber}>
                        {episode.frontmatter.title}
                      </Link>
                    </div>
                  ))}
                </EpisodeList>
              </MainContent>
            </Col>
            <Col sm="4">
              <Sidebar>
                <div dangerouslySetInnerHTML={{ __html: page.edges[1].node.html }} />
              </Sidebar>
            </Col>
          </Row>
        </MainContentBg>
      </Container>
    </Page>
  );
};

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
`;
