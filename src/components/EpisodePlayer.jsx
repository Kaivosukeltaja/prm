import React from "react";

const EpisodePlayer = ({ episode, autoPlay }) => {
  return <audio controls src={episode.frontmatter.file} autoPlay={autoPlay} />;
};

export default EpisodePlayer;
