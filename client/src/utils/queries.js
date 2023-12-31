import { gql } from '@apollo/client';

export const QUERY_CODES = gql`
  query getCodes {
    codes {
      _id
      title
      content
      programmingLanguage
      username
      createdAt
    }
  }
`;

export const QUERY_SINGLE_CODE = gql`
  query singleCode($codeId: ID!) {
    singleCode(codeId: $codeId) {
      _id
      title
      content
      programmingLanguage
      username
      createdAt
      comments {
        _id
      }
    }
  }
`;

export const QUERY_SINGLE_COMMENT = gql`
  query singleComment($commentId: ID!) {
    singleComment(commentId: $commentId) {
      _id
      text
      createdAt
      username
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    singleUser(userId: $userId) {
      _id
      username
      email
      codes {
        _id
        title
        content
        programmingLanguage
        username
        createdAt
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user {
    user {
      _id
      username
      email
      codes {
        _id
        title
        content
        programmingLanguage
        username
        createdAt
      }
    }
  }
`;

export const QUERY_COMMENT = gql`
  query getComment($codeId: ID!) {
    getComment(codeId: $codeId) {
      _id
      text
    }
  }
`


export const SEARCH_CODES_BY_TITLE = gql`
  query searchCodesByTitle($searchTerm: String!) {
    searchCodesByTitle(searchTerm: $searchTerm) {
      _id
      title
      content
      programmingLanguage
      username
      createdAt
      comments {
        _id
        text
        createdAt
        username
      }
    }
  }
`;

export const SEARCH_CODES_BY_USERNAME = gql`
  query searchCodesByUsername($searchTerm: String!) {
    searchCodesByUsername(searchTerm: $searchTerm) {
      _id
      title
      content
      programmingLanguage
      username
      createdAt
      comments {
        _id
        text
        createdAt
        username
      }
    }
  }
`;

