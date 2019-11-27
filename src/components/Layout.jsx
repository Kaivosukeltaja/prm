import React, { useReducer } from "react";

import { Container, Row, Col } from "reactstrap";
import styled from "styled-components";

import EpisodePlayer, { episodePlayerReducer, PlayerDispatchContext } from "./EpisodePlayer";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../static/css/styles.css";

const initialState = { episodePlaying: null };

const Layout = ({ children }) => {
  const [state, dispatch] = useReducer(episodePlayerReducer, initialState);
  return (
    <Page>
      <PlayerDispatchContext.Provider value={dispatch}>
        <TopBar>
          <Container>
            <NavBarBg>
              <Row>
                <Col>
                  <NavBar>
                    <div>Parin Rivin Muutos</div>
                    {state.episodePlaying && (
                      <EpisodePlayer
                        episode={state.episodePlaying}
                        autoPlay={true}
                      />
                    )}
                  </NavBar>
                </Col>
              </Row>
            </NavBarBg>
          </Container>
        </TopBar>
        <div>{children}</div>
      </PlayerDispatchContext.Provider>
    </Page>
  );
};

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

export default Layout;
