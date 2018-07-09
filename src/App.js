import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';

import gql from 'graphql-tag';

const PostList = () => (
  <Query
    query={gql`
      {
        posts {
          _id
          title
          content
          comments {
            _id
            postId
            content
          }
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error...{error.messageText}</p>;
      return(
        <ul>
          {data.posts.map(p => {
              return (
                <div key={p._id}>
                  <li>
                    <h3>{p.title}</h3>
                    <p>{p.content.slice(0, 24)}</p>
                  </li>
                  <ul>
                    {p.comments.map(
                      c => (
                        <li key={c._id}>
                          {c.content.slice(0, 24)}
                        </li>
                      ))
                    }
                  </ul>
                </div>
              );
            }
          )}
        </ul>
      );
    }}
  </Query>
);

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
});

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <h1>Blog</h1>
        </div>
        <PostList />
      </ApolloProvider>
    );
  }
}

// client.query({
//   query: gql`
//     {
//       posts {
//         _id
//         title
//         content
//       }
//     }
//   `
// }).then(res => console.log('post:', res));

export default App;
