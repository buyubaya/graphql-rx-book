import React from 'react';
import { compose } from 'redux';
// APOLLO
import { Query, Mutation, graphql } from "react-apollo";
import gql from "graphql-tag";
// QUERY AND MUTATION
const BOOK_QUERY = gql`
query book($id: ID, $page: Int){
    book(id: $id, page: $page) {
        _id
        name
    }
}`;

const LOGIN_MUTATION = gql`
    mutation login($username: String!, $password: String!, $file: Upload) {
        login(username: $username, password: $password, file: $file) {
            token
            error
        }
    }
`;


class SamplePage extends React.Component {
    constructor(){
        super();
        this.state = {
            bookList: [],
            loginError: ''
        };
    }

    componentWillReceiveProps(newProps){
        console.log('RECEIVE', newProps);
        if(newProps.bookQuery.loading === false){
            this.setState({ bookList: newProps.bookQuery.book });
        }
    }

    handleClick = () => {
        this.props.login && this.props.login({
            variables: {username: this.username.value, password: this.password.value}
        })
        .then(({ data }) => {
            this.setState({ loginError: data && data.login.error });
            console.log('LOG IN', data);
        });
    }

    handleLoadMore = () => {
        const { fetchMore } = this.props.bookQuery;
        fetchMore && fetchMore({
            variables: { page: 2 },
            updateQuery: (prevResult, { fetchMoreResult }) => ({
                ...prevResult,
                book: [fetchMoreResult.book]
            })
        })
        .then(({ data, errors, loading }) => {
            console.log('FETCH MORE', data);
            this.setState({ bookList: data.book });
        });
    }

    // _renderLoginForm(login, { data }){
    //     let username, password;

    //     function handleClick(){
    //         login({ variables: { username: username.value, password: password.value } })
    //         .then(({ data }) => {
    //             if(data && data.login.error){
    //                 console.log('Invalid');
    //             }
    //             else {
    //                 console.log('LOGGED IN', data);
    //             }
    //         });
    //     }

    //     return(
    //         <div>
    //             <input type='text' ref={el => username = el} />
    //             <input type='password' ref={el => password = el} />
    //             <button 
    //                 onClick={handleClick}
    //             >
    //                 Login
    //             </button>  
    //             {
    //                 data && data.login.error && <h2>{data.login.error}</h2>
    //             }
    //         </div>
    //     );
    // }

    render(){
        const { bookList, loginError } = this.state;

        return(
            <div>
                {
                    bookList && bookList.map(item =>
                        <div key={item._id}>
                            {item.name}
                        </div>    
                    )
                }
                <button onClick={this.handleLoadMore}>LOAD MORE</button>
                <div>
                    <input type='text' ref={el => this.username = el} />
                    <input type='password' ref={el => this.password = el} />
                    <button 
                        onClick={this.handleClick}
                    >
                        Login
                    </button>
                    {
                        loginError && <h2>{loginError}</h2>
                    }
                </div>
                {/* <Query query={BOOK_QUERY}>
                    {({ loading, error, data }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error :(</p>;

                        return data.book.map(({ _id, name }) => (
                            <div key={_id}>
                                {name}
                            </div>
                        ));
                    }}
                </Query> */}
                {/* <Mutation mutation={LOGIN_MUTATION}>
                    {this._renderLoginForm}
                </Mutation> */}
            </div>
        );
    }
}


export default compose(
    graphql(BOOK_QUERY, {name: 'bookQuery'}),
    graphql(LOGIN_MUTATION, {name: 'login'})
)(SamplePage);