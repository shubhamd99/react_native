import {gql} from '@apollo/client';

export default gql`
  query SearchQuery($term: String!) {
    search(term: $term) {
      artist
      episodesCount
      feedUrl
      podcastName
      thumbnail
      genres
    }
  }
`;
