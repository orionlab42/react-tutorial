import React, {Component} from "react";
import Joi from 'joi-browser';
import Input from './common/input';

class LoginForm extends Component {
    state = {
        account: {username: '', password: ''},
        errors: {}
    };

    // Refs - best to avoid them
    // username = React.createRef();
    // componentDidMount() {
    //     this.username.current.focus();
    // }

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    };

    validate = () => {
        const options = {abortEarly: false};
        const {error} = Joi.validate(this.state.account, this.schema, options);
        if (!error) return null;

        const errors = {};
        for (let item of error.details)
            errors[item.path[0]] = item.message;
        return errors;
        // This validation was without Joi :)))
        // const errors = {};
        // const {account} = this.state;
        // if (account.username.trim() === '')
        //     errors.username = 'Username is required.';
        //
        // if (account.password.trim() === '')
        //     errors.password = 'Password is required.';
        //
        // return Object.keys(errors).length === 0 ? null : errors;
    };

    handleSubmit = e => {
        e.preventDefault(); // prevent the submission of the form instead call the server and save the
        // changes and redirect the user to a different page

        const errors = this.validate();
        this.setState({errors: errors || {}});
        if (errors) return;

        // Call the server
        // const username = this.username.current.value;
        console.log('Submitted');
    };

    validateProperty = ({name, value}) => {
        const obj = {[name]: value};
        const schema = {[name]: this.schema[name]};
        const {error} = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;

        // This validation was without Joi :)))
        // if (name === 'username') {
        //     if (value.trim() === '') return 'Username is required.';
        //     // ...
        // }
        // if (name === 'password') {
        //     if (value.trim() === '') return 'Password is required.';
        //     // ...
        // }
    };

    handleChange = ({currentTarget: input}) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const account = {...this.state.account};
        // account.username = e.currentTarget.value;
        account[input.name] = input.value;
        this.setState({account, errors});
    };

    render() {
        const {account, errors} = this.state;
        return (
            <div className="container">
                <h1 className="title center">Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <Input
                        name="username"
                        value={account.username}
                        label="Username"
                        onChange={this.handleChange}
                        error={errors.username}
                    />
                    <Input
                        name="password"
                        value={account.password}
                        label="Password"
                        onChange={this.handleChange}
                        error={errors.password}
                    />

                    <div className="field">
                        <div className="control center">
                            <button
                                disabled={this.validate()}
                                className="button is-link">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginForm;