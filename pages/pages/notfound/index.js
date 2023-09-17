import React from 'react';
import Link from 'next/link';

const NotFoundPage = () => {
    return (
        <div
            className="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
            <div className="flex flex-column align-items-center justify-content-center">
                <div style={{
                    borderRadius: '56px',
                    padding: '0.3rem',
                    background: 'linear-gradient(180deg, rgba(33, 150, 243, 0.4) 10%, rgba(33, 150, 243, 0) 30%)'
                }}>
                    <div className="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center"
                         style={{borderRadius: '53px'}}>
                        <span className="text-blue-500 font-bold text-5xl">404</span>
                        <h1 className="text-900 font-bold text-3xl mb-2">I don't have this page yet, maybe someday!</h1>
                        <h3 className="text-600 mb-5">¯\_(ツ)_/¯</h3>
                        <Link href="/" className="w-full flex align-items-center py-5 border-300 border-bottom-1">
                            <span className="flex justify-content-center align-items-center bg-primary-400 border-round"
                                  style={{height: '3.5rem', width: '3.5rem'}}>
                                <i className="text-50 pi pi-fw pi-home text-2xl"></i>
                            </span>
                            <span className="ml-4 flex flex-column">
                                <span className="text-900 lg:text-xl font-medium mb-1">Home</span>
                                <span className="text-600 lg:text-lg">Go back to home page</span>
                            </span>
                        </Link>
                        <Link href="https://www.linkedin.com/in/abbozkir" target="_blank"
                              className="w-full flex align-items-center py-5 border-300 border-bottom-1">
                            <span className="flex justify-content-center align-items-center bg-blue-400 border-round"
                                  style={{height: '3.5rem', width: '3.5rem'}}>
                                <i className="text-50 pi pi-fw pi-linkedin text-2xl"></i>
                            </span>
                            <span className="ml-4 flex flex-column">
                                <span className="text-900 lg:text-xl font-medium mb-1">LinkedIn</span>
                                <span className="text-600 lg:text-lg">Get connected</span>
                            </span>
                        </Link>
                        <Link href="https://github.com/abbozkir" target="_blank"
                              className="w-full flex align-items-center py-5 border-300 border-bottom-1">
                            <span className="flex justify-content-center align-items-center bg-purple-400 border-round"
                                  style={{height: '3.5rem', width: '3.5rem'}}>
                                <i className="pi pi-fw pi-github text-50 text-2xl"></i>
                            </span>
                            <span className="ml-4 flex flex-column">
                                <span className="text-900 lg:text-xl font-medium mb-1">Github</span>
                                <span className="text-600 lg:text-lg">Check the source code</span>
                            </span>
                        </Link>
                        <Link href="mailto:abbozkir@gmail.com"
                               className="w-full flex align-items-center py-5 border-300 border-bottom-1">
                            <span className="flex justify-content-center align-items-center bg-orange-400 border-round"
                                  style={{height: '3.5rem', width: '3.5rem'}}>
                                <i className="pi pi-fw pi-at text-50 text-2xl"></i>
                            </span>
                            <span className="ml-4 flex flex-column">
                                <span className="text-900 lg:text-xl font-medium mb-1">E-Mail</span>
                                <span className="text-600 lg:text-lg">Ask something</span>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

NotFoundPage.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
        </React.Fragment>
    );
};

export default NotFoundPage;
