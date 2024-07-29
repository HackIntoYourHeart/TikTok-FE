import React, { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from './components/Layout';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
    return (
        <ErrorBoundary>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Router>
                        <div className="App">
                            <Routes>
                                //render các component theo những router
                                {publicRoutes.map((route, index) => {
                                    const Page = route.component;
                                    let Layout = DefaultLayout;
                                    if (route.layout) {
                                        Layout = route.layout;
                                    } else if (route.layout === null) {
                                        Layout = Fragment;
                                    }
                                    return (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            element={
                                                <Layout>
                                                    <Page />
                                                </Layout>
                                            }
                                        />
                                    );
                                })}
                            </Routes>
                        </div>
                        <ToastContainer />
                    </Router>
                </PersistGate>
            </Provider>
        </ErrorBoundary>
    );
}

export default App;
