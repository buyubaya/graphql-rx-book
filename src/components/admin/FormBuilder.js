import React from 'react';
import { Field } from 'formik';


class FormBuilder extends React.Component {
    constructor(props, context){
        super(props, context);

        this.stopPropagation = this.stopPropagation.bind(this);
    }

    getFieldComponent(item){
        const { values, setFieldValue } = this.props;

        switch(item.component){
            case 'text':
                return(
                    <Field 
                        type='text' 
                        name={item.fieldName} 
                        className='input' 
                    />
                );
            case 'password':
                return(
                    <Field 
                        type='password' 
                        name={item.fieldName} 
                        className='input' 
                    />
                );
            case 'email':
                return(
                    <Field 
                        type='email' 
                        name={item.fieldName} 
                        className='input' 
                    />
                );
            case 'number':
                return(
                    <Field 
                        type='number' 
                        name={item.fieldName} 
                        className='input'
                    />
                );
            case 'textarea':
                return(
                    <Field 
                        component='textarea' 
                        name={item.fieldName} 
                        className='input input-textarea'
                    />
                );
            case 'file':
                return(
                    <input 
                        name={item.fieldName}
                        type='file'
                        className='input input-file'
                        onChange={event => {
                            setFieldValue && setFieldValue(item.fieldName, event.currentTarget.files[0]);
                        }}
                    />
                );
            case 'select':
                return(
                    <Field 
                        component='select' 
                        name={item.fieldName} 
                        className='input input-select' 
                    >
                        <option value=''>Select</option>
                        {
                            item.data && item.data.map(x => {
                                return (
                                    <option value={x._id} key={x._id}>{x.name}</option>
                                );
                            })
                        }
                    </Field>
                );
            default:
                return(
                    <Field 
                        type='text' 
                        name={item.fieldName} 
                        className='input' 
                    />
                );
        }
    }

    stopPropagation(e){
        e.stopPropagation();
    }

    render(){
        const {
            values,
            touched,
            error,
            errors,
            handleChange,
            handleBlur,
            handleReset,
            handleSubmit,
            setFieldValue,
            formBuilderData
        } = this.props;
        
        return (
            <div className='admin-form-area' onClick={this.stopPropagation}>
                <form onSubmit={handleSubmit}>
                    {
                        formBuilderData && formBuilderData.map(item =>
                            <div className='input-group' key={item.fieldName}>
                                <div className='input-label'>{item.label}</div>
                                {this.getFieldComponent(item)}
                            </div>
                        )
                    }

                    {
                        errors && Object.keys(errors).length > 0 &&
                        <div className='input-errors-area'>
                            {
                                Object.keys(errors).map(k => {
                                    return <div className='input-error' key={k}>{errors[k]}</div>;
                                })
                            }
                        </div>
                    }
                    {
                        error &&
                        <div className='input-errors-area'>
                            <div className='input-error'>{error._form}</div>
                        </div>
                    }

                    <button type='button' className='btn-form mr20' onClick={handleReset}>Reset</button>
                    <button type='submit' className='btn-form'>Submit</button>
                </form>
            </div>
        );
    }
}


export default FormBuilder;