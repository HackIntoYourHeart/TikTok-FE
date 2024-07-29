import React from 'react';
import { toast } from 'react-toastify';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log('err: ', error);
        toast.error(error.message);
    }

    render() {
        return this.props.children;
    }
}

export default ErrorBoundary;
