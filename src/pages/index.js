import React, { useContext } from "react";

import { graphql } from "gatsby";
import { Container, Row, Col } from "reactstrap";
import styled from "styled-components";

import EpisodeList from "../components/EpisodeList";
import { PlayerDispatchContext } from "../components/EpisodePlayer";

const IndexPage = ({ data }) => {
  const dispatch = useContext(PlayerDispatchContext);
  const playEpisode = (episode) => {
    return () => {
      dispatch({
        type: "play",
        episode,
      });
    };
  };

  const episodes = data.episodes.edges;
  const page = data.page;

  return (
    <Container>
      <MainContentBg>
        <Row>
          <Col sm="8">
            <MainContent>
              <div
                dangerouslySetInnerHTML={{
                  __html: page.edges[0].node.html
                }}
              />
              <EpisodeList
                episodes={episodes}
                playEpisode={playEpisode}
              />
            </MainContent>
          </Col>
          <Col sm="4">
            <Sidebar>
              <div
                dangerouslySetInnerHTML={{
                  __html: page.edges[1].node.html
                }}
              />
            </Sidebar>
          </Col>
        </Row>
      </MainContentBg>
    </Container>
  );
};

export const getFrontPageContentQuery = graphql`
  query IndexQuery {
    episodes: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "episode" } } }
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
            slug
            date(formatString: "MMMM DD, YYYY")
            file
          }
        }
      }
    }
    page: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/index/.*md$/" } }
      sort: { order: ASC, fields: [frontmatter___title] }
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

export default IndexPage;
