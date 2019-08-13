import React from "react";
import { graphql } from "gatsby";
import Content, { HTMLContent } from "../components/Content";
import Helmet from "react-helmet";

const EpisodeTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  file,
  helmet
}) => {
  const EpisodeContent = contentComponent || Content;
  return (
    <div>
      Hello Episode!
      <EpisodeContent content={content} />
      <audio controls src={file} />
    </div>
  );
};

const Episode = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <EpisodeTemplate
      content={post.html}
      contentComponent={HTMLContent}
      description={post.frontmatter.description}
      helmet={
        <Helmet title={`${post.frontmatter.title} - Parin rivin muutos`} />
      }
      tags={post.frontmatter.tags}
      title={post.frontmatter.title}
      file={post.frontmatter.file}
    />
  );
};

export default Episode;

export const pageQuery = graphql`
  query EpisodeByID($id: String) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        file
      }
    }
  }
`;
