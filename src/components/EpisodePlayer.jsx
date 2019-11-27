import React from "react";

const EpisodePlayer = ({ episode, autoPlay }) => {
  return <audio controls src={episode.frontmatter.file} autoPlay={autoPlay} />;
};

export function episodePlayerReducer(state, action) {
  switch (action.type) {
    case "play":
      return { episodePlaying: action.episode };
    default:
      throw new Error();
  }
}

export const PlayerDispatchContext = React.createContext(null);

export default EpisodePlayer;
