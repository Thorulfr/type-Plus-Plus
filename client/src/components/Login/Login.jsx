import { React, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { EyeIcon } from '@heroicons/react/solid';

const Login = () => {
    const [login, { error }] = useMutation(LOGIN_USER);
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({ criteriaMode: 'all' });

    const onSubmit = async (newData) => {
        try {
            const { data } = await login({
                variables: { ...newData },
            });
            Auth.login(data.login.token);
        } catch (e) {
            document.getElementById('loginInvalid').classList.remove('hidden');
            setTimeout(() => {
                document.getElementById('loginInvalid').classList.add('hidden');
            }, 3000)
        }
    };

    return (
        <main className="bg-gray-200 flex-grow flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Welcome back!</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            {...register('email', {
                                required: 'Email is required',
                            })}
                            type="text"
                            placeholder="Email"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                        />
                        <ErrorMessage
                            errors={errors}
                            name="email"
                            render={({ messages }) => {
                                return messages
                                    ? Object.entries(messages).map(
                                          ([type, message]) => (
                                            <p
                                                key={type}
                                                className="p-2 font-bold text-red-500 text-center"
                                            >
                                                {message}
                                            </p>
                                        )
                                    )
                                    : null;
                            }}
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                        />

                        <div className='flex'>
                            <input
                                {...register('password', {
                                    required: 'Password is required',
                                })}
                                type={passwordShown ? "text" : "password"}
                                placeholder="Password"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                            />

                            <i onClick={togglePasswordVisiblity}><EyeIcon className="h-7 m-3 text-blue-500" /></i>
                        </div>
                        <ErrorMessage
                            errors={errors}
                            name="password"
                            render={({ messages }) => {
                                return messages
                                    ? Object.entries(messages).map(
                                          ([type, message]) => (
                                            <p
                                                key={type}
                                                className="p-2 font-bold text-red-500 text-center"
                                            >
                                                {message}
                                            </p>
                                        )
                                    )
                                    : null;
                            }}
                        />

                        <div className="p-2 font-bold text-red-500 text-center hidden" id="loginInvalid">Invalid credentials</div>

                        <button
                            type="submit"
                            className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none my-1"
                        >
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Login;
