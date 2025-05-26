import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { NavigateFunction } from 'react-router-dom';
import Swal from 'sweetalert2';
import { baseUrl } from './urls';

const apiClient = axios.create({
    baseURL: baseUrl,
});

// Define toast mixin
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: '#0a2540', // Soft dark background
    color: '#f5f5f5', // Light text for readability
    customClass: {
        popup: 'rounded-xl shadow-lg', // softer corners and shadow
        title: 'text-sm font-medium',
        timerProgressBar: 'bg-white/40', // subtle white progress bar
    },
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
});


const setupInterceptors = (navigate: NavigateFunction) => {
    apiClient.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    apiClient.interceptors.response.use(
        (response: AxiosResponse) => {
            const data = response.data;

            if ((response.status === 200 || response.status === 201) && data?.message) {
                Toast.fire({
                    icon: 'success',
                    title: data.message,
                });
            }

            return response;
        },
        (error: AxiosError<any>) => {
            if (error.response) {
                const { status, data } = error.response;

                switch (status) {
                    case 401:
                        Toast.fire({
                            icon: 'warning',
                            title: 'Unauthorized. Redirecting...',
                        });
                        navigate('/auth/boxed-signin');
                        break;

case 400:
    console.log('Received 400 error', data);

    if (data?.error?.data && typeof data?.error?.data === 'object') {
        console.log('data.data is an object:', data.data);

        const messages: string[] = [];

        Object.entries(data?.error?.data).forEach(([key, value]) => {
            console.log(`Processing field: ${key}, value:`, value);

            if (Array.isArray(value)) {
                value.forEach((msg: string, index: number) => {
                    console.log(`Adding message [${index}] for ${key}: ${msg}`);
                    messages.push(`${msg}`);
                });
            } else {
                console.log(`Value for ${key} is not an array`, value);
            }
        });

        console.log('Final compiled messages array:', messages);

        Toast.fire({
            icon: 'error',
            title: messages.length
                ? messages.join('\n')
                : data?.message || 'Validation failed',
        });

        console.log('Toast displayed with validation messages');
    } else {
        console.warn('data.data is not an object. Fallback Toast triggered.', data);

        Toast.fire({
            icon: 'error',
            title: data?.message || 'Something went wrong',
        });

        console.log('Fallback Toast displayed');
    }
    break;


                    case 500:
                        Toast.fire({
                            icon: 'error',
                            title: 'Internal Server Error.',
                        });
                        break;

                    default:
                        Toast.fire({
                            icon: 'error',
                            title: data?.message || `Error: ${status}`,
                        });
                        break;
                }
            } else {
                Toast.fire({
                    icon: 'error',
                    title: 'Network error or unexpected issue.',
                });
            }

            return Promise.reject(error);
        }
    );
};


export { apiClient, setupInterceptors };
