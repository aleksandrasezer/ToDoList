import React from "react";
import {Button, Checkbox, Paper} from "@material-ui/core";
import {Field, FormikProvider, useFormik} from 'formik';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {logIn} from "../../store/auth-reducer";
import s from './Login.module.css'
import {Redirect} from "react-router-dom";

export const Login = () => {
    const dispatch = useDispatch()
    const {isLoggedIn} = useSelector((state: AppRootStateType) => state.auth)


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: (values) => {
            const errors: LoginErrorType = {};
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Password is required';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(logIn(values))
            formik.resetForm();
        },
    });

    if (isLoggedIn) {
        return <Redirect to={"/"}/>
    }
    return (
        <FormikProvider value={formik}>
            <div style={{display: "flex",justifyContent: "space-around"}}>
                <Paper className={s.loginContainer}
                       elevation={10}>
                    <h2 style={{color: 'darkGreen'}}> Login </h2>

                    <form onSubmit={formik.handleSubmit}>
                        <div className={s.formItem}>
                            <label htmlFor="email">Email</label><br/>
                            <Field
                                type='email'
                                placeholder='E-mail'
                                error={formik.touched.email ? formik.errors.email : null}
                                name='email'
                            /></div>
                        <div className={s.formItem}>
                            <label htmlFor="password">Password</label><br/>
                            <Field
                                type='password'
                                placeholder='Password'
                                error={formik.touched.password ? formik.errors.password : null}
                                name={'password'}
                            /></div>

                        <div>
                            <Checkbox name='rememberMe' style={{color: 'green'}}/>
                            Remember me
                        </div>

                        <Button type='submit' style={{color: 'green'}} variant='outlined'>
                            Login
                        </Button>

                        <div className={s.free}>
                            To log in get registered <a href='https://social-network.samuraijs.com/' target='_blank'>here</a><br/>
                            or use common test account credentials: <br/>
                            Email: <span style={{color: 'black'}}>free@samuraijs.com</span> <br/>
                            Password: <span style={{color: 'black'}}>free</span>
                        </div>

                    </form>
                </Paper>
            </div>
        </FormikProvider>
    )
}


type LoginErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}