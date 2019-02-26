import React from 'react';
// APOLLO
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
// QUERY AND MUTATION
const BOOK_QUERY = gql`
{
    book {
        _id
        name
    }
}`;

const LOGIN_MUTATION = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            error
        }
    }
`;


class SamplePage extends React.Component {
    _renderLoginForm(login, { data }){
        let username, password;

        function handleClick(){
            login({ variables: { username: username.value, password: password.value } })
            .then(({ data }) => {
                if(data && data.login.error){
                    console.log('Invalid');
                }
                else {
                    console.log('LOGGED IN', data);
                }
            });
        }

        return(
            <div>
                <input type='text' ref={el => username = el} />
                <input type='password' ref={el => password = el} />
                <button 
                    onClick={handleClick}
                >
                    Login
                </button>  
                {
                    data && data.login.error && <h2>{data.login.error}</h2>
                }
            </div>
        );
    }

    render(){
        return(
            <div>
                <Query query={BOOK_QUERY}>
                    {({ loading, error, data }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error :(</p>;

                        return data.book.map(({ _id, name }) => (
                            <div key={_id}>
                                {name}
                            </div>
                        ));
                    }}
                </Query>
                <Mutation mutation={LOGIN_MUTATION}>
                    {this._renderLoginForm}
                </Mutation>
            </div>
        );
    }
}


export default SamplePage;