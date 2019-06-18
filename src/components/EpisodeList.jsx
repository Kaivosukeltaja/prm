import React from "react";
import styled from "styled-components";

const EpisodeListLayout = styled.div`
  border: 1px solid #ffffff;
  padding: 1em;
`;

const EpisodeList = ({ episodes, playEpisode }) => {
  return (
    <EpisodeListLayout>
      {episodes.map(({ node: episode }) => (
        <div key={episode.id}>
          <button onClick={playEpisode(episode)}>
            {episode.frontmatter.title}
          </button>
        </div>
      ))}
    </EpisodeListLayout>
  );
};

export default EpisodeList;
