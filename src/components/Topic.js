import React, { useState } from 'react';
import { searchTopics } from '../common/gqlqueries';
import TopicsList from './TopicsList';
import { BsPlusSquare, BsDashSquare } from 'react-icons/bs';

const Topic = (props) => {
    const [ isOpen, setIsOpen ] = useState(false),
          topicName = props.topic.name,
          totalCount = props.topic.stargazers.totalCount;

    return(
        <div className="topic--item">
            <div className="topic--header">
                <span className="topic--toggler" id={props.topic.id} onClick={() => setIsOpen(!isOpen)}>
                    { isOpen? <BsDashSquare /> : <BsPlusSquare />
                    }
                </span>
                <div className="topic--info">
                    <span className="topic--name">{topicName}</span>
                    <span className="label-stargazers">stargazers: { totalCount }</span>
                </div>
            </div>
            { isOpen && <TopicsList gqlQry={searchTopics} needle={topicName} /> }
        </div>
    );
}

export default Topic;