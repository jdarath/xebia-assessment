# GitHub Topic Explorer

## Assignment:

Your task is to build a React web application that displays all the "[topics](https://docs.github.com/en/free-pro-team@latest/graphql/reference/objects#topic)" related to the term "react", using the GitHub GraphQL API.

The application should display how many "[stargazers](https://docs.github.com/en/free-pro-team@latest/graphql/reference/objects#stargazerconnection)" each topic has. A click on a topic should display the topics related to that topic, and how many stargazers they have. And so forth. There should also be Search capability to search/query on any term or topic. You should implement best practices with the UI. 

To interact with the Github GraphQL API you'll need to have
  * a [Github API key](https://docs.github.com/en/free-pro-team@latest/graphql/guides/forming-calls-with-graphql#authenticating-with-graphql)
  * You'll want to make use of the key in the .env file within your application

You may use whatever React framework or library you find useful. URL routing is optional.


## Evaluation:

* We will pay particular attention to the way the code is organized, and to the overall readability
* Unit tests will be greatly appreciated
* Design will be ignored, however usability and accessibility will be taken into consideration
* Remember to update this README with instructions on how to install, run and test your application
* Your first goal is to have a working app, but feel free to improve the application however you see fit
* We hope that you can complete the assignment within 2 hours but don't set any time constraints
* Please reach out per email or by opening an issue if anything is unclear or blocking you

Best of luck

## Dev Notes

* ApolloClient for query and data handling
* react-icons for common visual aid (+, -, loading icons)
* @testing-library for UT


### How to run app & test

* Setup by running `npm install`.
* Add the GitHub API Token to the .env file
* Run it by using the command `npm start` or `npm run start`
* User can click on the more (+) button to load child-like relative topics
* User can click on the less (-) button to hide the relative topics block below.
* User can type a new topic on the search bar at the top
* If search bar is left blank, "react" will be set back. That's intended.
* Run tests by using the command `npm test` or `npm run test`


### Future Improvements

Feel free to elaborate on how you would improve any of the following topics 

* Code Structuring:

* Refactoring:

* Additional Features:
  * Provide a list of actual GitHub repos within each topic.
  * Provide a "load more" topics whenever there are more than 10 (as far as I could tell, the API only provides a max of 10)
