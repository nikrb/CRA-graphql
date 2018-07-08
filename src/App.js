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
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      console.log(data);
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error...</p>;
      return(
        <ul>
          {data.posts.map(p => <li key={p._id}>{p.title}</li>)}
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
