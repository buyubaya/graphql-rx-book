import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withFormik } from 'formik';
import FormBuilder from '../../components/admin/FormBuilder';
import { 
    USER_API_URL
} from '../../constants/ApiUrls';
// APOLLO


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
        fetch(`${USER_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                username: values.username,
                password: values.password
            })
        })
        .then(
            res => {
                if(res.status === 200){
                    return res.json();
                }
                throw new Error(res.statusText);
            }
        )
        .then(
            json => {
                setSubmitting(false);
                resetForm();
                console.log('JSON', json);
                props.onSubmitSuccess && props.onSubmitSuccess(json);
            }
        )
        .catch(err => {
            setError({_form: 'Invalid username and password'});
        });
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
        const { login } = this.props;
        const user = {
            username: data.username,
            token: data.token
        };
        login && login(user);
        sessionStorage.setItem('user', JSON.stringify(user));
        this.props.history.push('/admin/book');
    }

    render(){
        const { formBuilderData } = this.state;

        return(
            <div className='admin-login-page'>
                <div className='wrap-lg'>
                    <LoginFormBuilder 
                        formBuilderData={formBuilderData}
                        onSubmitSuccess={this.onSubmitSuccess}
                    />
                </div>
            </div>
        );
    }
}


export default connect(
    state => ({
        user: state.user
    }),
    dispatch => ({
        login: data => dispatch({ type: 'FETCH_USER_SUCCESS', payload: data })
    })
)(AdminLoginPage);