import actionTypes from './action-types';

const initialState = {
    allTopics: ['react'],
    topicTree: { name: 'react', children: [] },
    isDataLoaded: false
};

function MainReducer(state = initialState, action) {
    const currentTopics = [...state.allTopics];
    switch(action.type) {
        case actionTypes.ADD_TOPIC:
            if(!currentTopics.includes(action.newTopic)) currentTopics.push(action.newTopic);
            return(Object.assign({}, state, { allTopics: currentTopics }));
        case actionTypes.ADD_TOPICS:
            action.newTopics.forEach(topic => {
                if(!currentTopics.includes(topic)) currentTopics.push(topic);
            });
            return(Object.assign({}, state, { allTopics: currentTopics }));
        case actionTypes.SET_TOPICS:
            return(Object.assign({}, state, { allTopics: [...action.topics ]}));
        case actionTypes.SET_TOPIC_BASE:
            const newTree = { name: action.name, children: [] };
            return(Object.assign({}, state, { topicTree: newTree, allTopics: [action.name], isDataLoaded: false }));
        case actionTypes.SET_TOPIC_TREE:
            const newTopicsList = action.topicTree.children.map(topic => topic.name);
            newTopicsList.push(action.topicTree.name);
            return(Object.assign({}, state, { topicTree: action.topicTree, allTopics: newTopicsList, isDataLoaded: true }));
        default:
            return state;
    }
};

export default MainReducer;