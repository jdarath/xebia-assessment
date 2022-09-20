import gql from "graphql-tag";

export const searchTopics = gql`
query searchTopics($search: String!) {
    parentList: topic(name: $search) {
        relatedTopics(first: 10) {
            id
            name
            stargazers {
                totalCount
            }
        }
    }
}`;

/*export const searchTopics = gql`
query SearchTopics($search: String!) {
    search(query: $search, type: REPOSITORY, first: 10) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            stargazers {
              totalCount
            }
            name
            resourcePath
            relatedTopics
          }
        }
      }
    }
}`;*/