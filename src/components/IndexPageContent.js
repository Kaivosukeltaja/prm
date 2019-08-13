import React from "react";
import { StaticQuery, graphql } from "gatsby";

const IndexPageContent = () => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={() => <div />}
  />
);

export default IndexPageContent;
