import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            createdAt
            bio
            location
        }
        scoresByUser(username: $username) {
          wpm
          accuracy
          createdAt
          username
        }
        
    }
`;


// query logged in user's information and scores sorted by WPM
export const QUERY_ME = gql`
    {
        me {
            _id
            username
            email
            createdAt
            bio
            location
            friends {
                _id
                username
            }
        }
        meScores {
            wpm
            accuracy
            createdAt
        }
    }
`;

export const QUERY_SCORES = gql`
    query Scores {
        scores {
            wpm
            accuracy
            username
            createdAt
        }
    }
`

// query logged in user's scores sorted by date (for chart)
export const QUERY_MYSCORE = gql`
    query meScores {
        meScores {
            wpm
            accuracy
            createdAt
        }
    }
`;
