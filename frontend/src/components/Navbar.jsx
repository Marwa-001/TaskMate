import { useState } from 'react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleNotifications = () => setShowNotifications(!showNotifications);

    return (
        <header className="sticky-top shadow-sm" style={{ backgroundColor: '#1a1d29' }}>
            <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between py-3">
                    {/* Logo and Brand */}
                    <div className="d-flex align-items-center">
                        <a href="/" className="d-flex align-items-center text-decoration-none me-4">
                            <div 
                                className="d-flex align-items-center justify-content-center me-2 rounded"
                                style={{ 
                                    width: '40px', 
                                    height: '40px', 
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    transition: 'transform 0.2s ease'
                                }}
                                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                            >
                                <span className="text-white fw-bold">T</span>
                            </div>
                            <span className="text-white fw-bold fs-4 d-none d-sm-inline">TaskMate</span>
                        </a>

                        {/* Navigation Links - Desktop */}
                        {/* <nav className="d-none d-lg-flex">
                            <ul className="nav me-4">
                                <li className="nav-item">
                                    <a href="#dashboard" className="nav-link text-light px-3 py-2 rounded hover-bg-secondary">
                                        Dashboard
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#projects" className="nav-link text-light px-3 py-2 rounded hover-bg-secondary">
                                        Projects
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#tasks" className="nav-link text-light px-3 py-2 rounded hover-bg-secondary">
                                        Tasks
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#team" className="nav-link text-light px-3 py-2 rounded hover-bg-secondary">
                                        Team
                                    </a>
                                </li>
                            </ul>
                        </nav> */}
                    </div>

                    {/* Search and Actions */}
                    <div className="d-flex align-items-center gap-3">
                        {/* Search Bar */}
                        <div className="position-relative d-none d-md-flex">
                            <span 
                                className="position-absolute text-muted"
                                style={{ 
                                    left: '12px', 
                                    top: '50%', 
                                    transform: 'translateY(-50%)', 
                                    zIndex: 10,
                                    fontSize: '16px'
                                }}
                            >
                                🔍
                            </span>
                            <input
                                type="search"
                                className="form-control ps-5"
                                placeholder="Search tasks, projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    backgroundColor: '#2a2d3a',
                                    border: '1px solid #404454',
                                    color: 'white',
                                    minWidth: '250px'
                                }}
                            />
                        </div>

                        {/* Notifications */}
                        <div className="position-relative">
                            <button
                                className="btn btn-link text-light p-2 position-relative"
                                onClick={toggleNotifications}
                                style={{ border: 'none', fontSize: '18px' }}
                            >
                                🔔
                                <span 
                                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                    style={{ fontSize: '0.6rem' }}
                                >
                                    3
                                </span>
                            </button>
                            
                            {/* Notifications Dropdown */}
                            {showNotifications && (
                                <div 
                                    className="position-absolute end-0 mt-2 bg-dark border rounded shadow-lg"
                                    style={{ width: '300px', zIndex: 1000 }}
                                >
                                    <div className="p-3 border-bottom">
                                        <h6 className="text-light mb-0">Notifications</h6>
                                    </div>
                                    <div className="p-2">
                                        <div className="p-2 mb-1 rounded hover-bg-secondary">
                                            <small className="text-light">✅ New task assigned: Update dashboard</small>
                                            <br />
                                            <small className="text-muted">2 minutes ago</small>
                                        </div>
                                        <div className="p-2 mb-1 rounded hover-bg-secondary">
                                            <small className="text-light">⏰ Project deadline approaching</small>
                                            <br />
                                            <small className="text-muted">1 hour ago</small>
                                        </div>
                                        <div className="p-2 rounded hover-bg-secondary">
                                            <small className="text-light">👥 Team meeting in 30 minutes</small>
                                            <br />
                                            <small className="text-muted">25 minutes ago</small>
                                        </div>
                                    </div>
                                    <div className="p-2 border-top">
                                        <button className="btn btn-sm btn-outline-light w-100">
                                            View All Notifications
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Settings */}
                        <button 
                            className="btn btn-link text-light p-2" 
                            style={{ border: 'none', fontSize: '18px' }}
                            title="Settings"
                        >
                            ⚙️
                        </button>

                        {/* User Profile */}
                        <div className="d-none d-sm-flex align-items-center">
                            <button 
                                className="btn d-flex align-items-center gap-2 px-3 py-2 rounded"
                                style={{ 
                                    backgroundColor: '#2a2d3a',
                                    border: '1px solid #404454',
                                    color: 'white'
                                }}
                            >
                                <div 
                                    className="rounded-circle d-flex align-items-center justify-content-center"
                                    style={{ width: '32px', height: '32px', backgroundColor: '#667eea' }}
                                >
                                    <span style={{ fontSize: '14px' }}>👤</span>
                                </div>
                                <span className="d-none d-lg-inline">John Doe</span>
                                <span style={{ fontSize: '12px', marginLeft: '4px' }}>▼</span>
                            </button>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="btn btn-link text-light d-lg-none p-2"
                            onClick={toggleMenu}
                            style={{ border: 'none', fontSize: '20px' }}
                        >
                            {isMenuOpen ? '✕' : '☰'}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="d-lg-none border-top pt-3 pb-2" style={{ borderColor: '#404454' }}>
                        {/* Mobile Search */}
                        <div className="mb-3">
                            <div className="position-relative">
                                <span 
                                    className="position-absolute text-muted"
                                    style={{ 
                                        left: '12px', 
                                        top: '50%', 
                                        transform: 'translateY(-50%)', 
                                        zIndex: 10,
                                        fontSize: '16px'
                                    }}
                                >
                                    🔍
                                </span>
                                <input
                                    type="search"
                                    className="form-control ps-5"
                                    placeholder="Search..."
                                    style={{
                                        backgroundColor: '#2a2d3a',
                                        border: '1px solid #404454',
                                        color: 'white'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Mobile Navigation */}
                        {/* <nav>
                            <ul className="nav flex-column gap-1">
                                <li>
                                    <a href="#dashboard" className="nav-link text-light py-2 d-flex align-items-center">
                                        <span className="me-2">📊</span> Dashboard
                                    </a>
                                </li>
                                <li>
                                    <a href="#projects" className="nav-link text-light py-2 d-flex align-items-center">
                                        <span className="me-2">📁</span> Projects
                                    </a>
                                </li>
                                <li>
                                    <a href="#tasks" className="nav-link text-light py-2 d-flex align-items-center">
                                        <span className="me-2">✅</span> Tasks
                                    </a>
                                </li>
                                <li>
                                    <a href="#team" className="nav-link text-light py-2 d-flex align-items-center">
                                        <span className="me-2">👥</span> Team
                                    </a>
                                </li>
                            </ul>
                        </nav> */}

                        {/* Mobile Actions */}
                        <div className="d-sm-none mt-3 pt-3 border-top d-flex justify-content-around" style={{ borderColor: '#404454' }}>
                            <button className="btn btn-outline-light btn-sm">
                                ⚙️ Settings
                            </button>
                            <button className="btn btn-outline-light btn-sm">
                                👤 Profile
                            </button>
                            <button className="btn btn-warning btn-sm">
                                Sign Out
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                .hover-bg-secondary:hover {
                    background-color: #2a2d3a !important;
                    transition: background-color 0.2s ease;
                }
                
                .nav-link {
                    transition: all 0.2s ease;
                }
                
                .nav-link:hover {
                    color: #ffffff !important;
                    background-color: #2a2d3a !important;
                }
                
                .btn:focus {
                    box-shadow: none;
                }
                
                .form-control:focus {
                    box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
                    border-color: #667eea;
                }

                .btn:hover {
                    transform: translateY(-1px);
                    transition: transform 0.2s ease;
                }

                @media (max-width: 768px) {
                    .container-fluid {
                        padding-left: 1rem !important;
                        padding-right: 1rem !important;
                    }
                }
            `}</style>
        </header>
    );
};

export default Navbar;