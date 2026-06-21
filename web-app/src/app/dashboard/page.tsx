'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if user is logged in
        const userData = localStorage.getItem('user');
        if (!userData) {
            router.push('/');
            return;
        }
        setUser(JSON.parse(userData));
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/');
    };

    if (!user) {
        return <div style={styles.loading}>Loading...</div>;
    }

    return (
        <div style={styles.container} data-testid="dashboard-container">
            <div style={styles.header}>
                <h1 style={styles.title} data-testid="dashboard-title">
                    Dashboard
                </h1>
                <button
                    onClick={handleLogout}
                    data-testid="logout-button"
                    style={styles.logoutButton}
                >
                    Logout
                </button>
            </div>

            <div style={styles.card} data-testid="welcome-card">
                <p style={styles.welcome} data-testid="welcome-text">
                    Welcome back, <strong>{user.username}</strong>! 👋
                </p>
                <p style={styles.subtext}>You are successfully logged in.</p>
            </div>

            <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                    <h3>Total Users</h3>
                    <p>1,234</p>
                </div>
                <div style={styles.statCard}>
                    <h3>Active Sessions</h3>
                    <p>45</p>
                </div>
                <div style={styles.statCard}>
                    <h3>Messages</h3>
                    <p>89</p>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '40px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
    },
    title: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#333',
    },
    logoutButton: {
        padding: '10px 20px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
    },
    card: {
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: '24px',
    },
    welcome: {
        fontSize: '20px',
        color: '#333',
    },
    subtext: {
        color: '#666',
        marginTop: '8px',
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
    },
    statCard: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    loading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '18px',
        color: '#666',
    },
};