import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div>
            <h2>404 - Page Not Found</h2>
            <p>Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
            <Link to="/">Go Back to Home</Link>
        </div>
    );
}

export default NotFound;
