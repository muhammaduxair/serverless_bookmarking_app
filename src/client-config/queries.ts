import { gql } from "@apollo/client";

export const GET_BOOKMARKS = gql`
  query {
    allBookmarks {
      ref
      data {
        title
        url
        bg
      }
    }
  }
`;

export const ADD_BOOKMARK = gql`
  mutation addBookmark($title: String!, $url: String!, $bg: String!) {
    addBookmark(title: $title, url: $url, bg: $bg) {
      ref
      data {
        title
        url
        bg
      }
    }
  }
`;
export const DEL_BOOKMARK = gql`
  mutation deleteBookmark($id: ID!) {
    deleteBookmark(id: $id) {
      ref
      data {
        title
        url
        bg
      }
    }
  }
`;
