import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../common/store/store';
import { MockedProvider } from '@apollo/client/testing';
import { searchTopics } from '../common/gqlqueries';
import TopicsList from './TopicsList';

const mockData = {
  request: {
    query: searchTopics,
    variables: { search: 'react '}
  },
  result: {
    data: {
      "parentList": {
        "relatedTopics": [
          {
            "id": "MDU6VG9waWNhbmd1bGFy",
            "name": "angular",
            "stargazers": {
              "totalCount": 45785,
              "__typename": "StargazerConnection"
            },
            "__typename": "Topic"
          },
          {
            "id": "MDU6VG9waWNuZXh0anM=",
            "name": "nextjs",
            "stargazers": {
              "totalCount": 743,
              "__typename": "StargazerConnection"
            },
            "__typename": "Topic"
          },
          {
            "id": "MDU6VG9waWNyZWFjdC1uYXRpdmU=",
            "name": "react-native",
            "stargazers": {
              "totalCount": 26190,
              "__typename": "StargazerConnection"
            },
            "__typename": "Topic"
          },
          {
            "id": "MDU6VG9waWN2dWU=",
            "name": "vue",
            "stargazers": {
              "totalCount": 50735,
              "__typename": "StargazerConnection"
            },
            "__typename": "Topic"
          },
          {
            "id": "MDU6VG9waWNtYWNoaW5lLWxlYXJuaW5n",
            "name": "machine-learning",
            "stargazers": {
              "totalCount": 58900,
              "__typename": "StargazerConnection"
            },
            "__typename": "Topic"
          },
          {
            "id": "MDU6VG9waWNoYWNrdG9iZXJmZXN0",
            "name": "hacktoberfest",
            "stargazers": {
              "totalCount": 15935,
              "__typename": "StargazerConnection"
            },
            "__typename": "Topic"
          },
          {
            "id": "MDU6VG9waWNqYXZh",
            "name": "java",
            "stargazers": {
              "totalCount": 120876,
              "__typename": "StargazerConnection"
            },
            "__typename": "Topic"
          },
          {
            "id": "MDU6VG9waWNvY3I=",
            "name": "ocr",
            "stargazers": {
              "totalCount": 119,
              "__typename": "StargazerConnection"
            },
            "__typename": "Topic"
          },
          {
            "id": "MDU6VG9waWNmbGFzaw==",
            "name": "flask",
            "stargazers": {
              "totalCount": 22153,
              "__typename": "StargazerConnection"
            },
            "__typename": "Topic"
          }
        ],
        "__typename": "Topic"
      }
    }
  }
};

test('fetches first level topics', async () => {
  render(
    <Provider store={store}>
      <MockedProvider mocks={[mockData]} addTypeName={false}>
        <TopicsList topics={mockData.result.data.parentList.relatedTopics.map(topic => { return({ id: topic.id, name: topic.name, stargazers: topic.stargazers.totalCount })})} />
      </MockedProvider>
    </Provider>
  );

  expect(await screen.findByText("hacktoberfest")).toBeInTheDocument();
});