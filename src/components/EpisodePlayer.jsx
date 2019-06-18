import React from "react";

const EpisodePlayer = ({ episode }) => {
  return <audio controls src={episode.frontmatter.file} />;
};

export default EpisodePlayer;
