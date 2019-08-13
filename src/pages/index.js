import React from "react";
import { Container, Row, Col } from "reactstrap";
import styled from "styled-components";
import { graphql } from "gatsby";

import EpisodeList from "../components/EpisodeList";
import EpisodePlayer from "../components/EpisodePlayer";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../static/css/styles.css";

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      episodePlaying: null
    };
    this.playEpisode = this.playEpisode.bind(this);
  }

  playEpisode(episode) {
    return () => {
      this.setState(({ state }) => ({
        ...state,
        episodePlaying: episode
      }));
    };
  }

  render() {
    const { data } = this.props;
    const episodes = data.episodes.edges;
    const page = data.page;

    return (
      <Page>
        <TopBar>
          <Container>
            <NavBarBg>
              <Row>
                <Col>
                  <NavBar>
                    <div>Parin Rivin Muutos</div>
                    {this.state.episodePlaying && (
                      <EpisodePlayer
                        episode={this.state.episodePlaying}
                        autoPlay={true}
                      />
                    )}
                  </NavBar>
                </Col>
              </Row>
            </NavBarBg>
          </Container>
        </TopBar>
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
                    playEpisode={this.playEpisode}
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
      </Page>
    );
  }
}

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
            episodeNumber
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

const Page = styled.div`
  background-color: #000;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
`;

const TopBar = styled.div`
  position: sticky;
  align-self: stretch;
  top: 0;
  z-index: 1;
`;

const NavBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em;
`;

const NavBarBg = styled.div`
  background-color: #b4eb45;
  background-image: linear-gradient(to right, #b4eb45, #7ed321);
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
