import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withFormik } from 'formik';
import FormBuilder from '../../components/admin/FormBuilder';
import { 
    USER_API_URL
} from '../../constants/ApiUrls';
// APOLLO
import { graphql } from "react-apollo";
import gql from "graphql-tag";
// QUERY AND MUTATION
const LOGIN_MUTATION = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            username
            token
            error
        }
    }
`;


const LoginFormBuilder = withFormik({
    displayName: 'AdminLoginForm',
    enableReinitialize: true,

    mapPropsToValues: (props) => ({
        username: '',
        password: ''
    }),

    validate: values => {
        const errors = {};

        if (!values.username) {
            errors.name = 'UsenName Required';
        }

        if (!values.password) {
            errors.category = 'Password Required';
        }

        return errors;
    },

    onReset: (values) => {
        console.log('RESET', values);
    },

    handleSubmit: (values, { setSubmitting, validateForm, resetForm, setError, props }) => {
        validateForm();
        const { login } = props;
        login && login({
            variables: {username: values.username, password: values.password}
        })
        .then(
            ({ data }) => {
                setSubmitting(false);
                if(data && data.login.error){  
                    setError({_form: data.login.error});
                }
                else {
                    resetForm();
                    props.onSubmitSuccess && props.onSubmitSuccess(data);
                }
            }
        )
        .catch(err => {
            setError({_form: err.toString()});
        });
        // fetch(`${USER_API_URL}/login`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json' 
        //     },
        //     body: JSON.stringify({
        //         username: values.username,
        //         password: values.password
        //     })
        // })
        // .then(
        //     res => {
        //         if(res.status === 200){
        //             return res.json();
        //         }
        //         throw new Error(res.statusText);
        //     }
        // )
        // .then(
        //     json => {
        //         setSubmitting(false);
        //         resetForm();
        //         console.log('JSON', json);
        //         props.onSubmitSuccess && props.onSubmitSuccess(json);
        //     }
        // )
        // .catch(err => {
        //     setError({_form: 'Invalid username and password'});
        // });
    },

    validateOnChange: false,
    validateOnBlur: false
})(FormBuilder);


class AdminLoginPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            formBuilderData: [
                {
                    label: 'Username',
                    fieldName: 'username',
                    component: 'text'
                },
                {
                    label: 'Password',
                    fieldName: 'password',
                    component: 'password'
                }
            ]
        };

        this.onSubmitSuccess = this.onSubmitSuccess.bind(this);
    }

    onSubmitSuccess(data){
        const { updateLoginUser } = this.props;
        const user = {
            username: data.login.username,
            token: data.login.token
        };
        updateLoginUser && updateLoginUser(user);
        sessionStorage.setItem('user', JSON.stringify(user));
        this.props.history.push('/admin/book');
    }

    render(){
        const { formBuilderData } = this.state;
        const { login } = this.props;
        
        return(
            <div className='admin-login-page'>
                <div className='wrap-lg'>
                    <LoginFormBuilder 
                        formBuilderData={formBuilderData}
                        onSubmitSuccess={this.onSubmitSuccess}
                        login={login}
                    />
                </div>
            </div>
        );
    }
}


// export default connect(
//     state => ({
//         user: state.user
//     }),
//     dispatch => ({
//         login: data => dispatch({ type: 'FETCH_USER_SUCCESS', payload: data })
//     })
// )(AdminLoginPage);
export default compose(
    connect(
        state => ({
            user: state.user
        }),
        dispatch => ({
            updateLoginUser: data => dispatch({ type: 'FETCH_USER_SUCCESS', payload: data })
        })
    ),
    graphql(LOGIN_MUTATION, { name: 'login' })
)(AdminLoginPage);