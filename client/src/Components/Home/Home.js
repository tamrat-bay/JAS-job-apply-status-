import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';


const Home = () => {

    return (
        <div className='Home'>
            <div className='Home-container'>
                <section className='Home_titles'>
                    <h1>JAS</h1>
                    <p>Go get your dream job</p>
                </section>

                <section className='Home_container-boxes'>
                    <div className='Home_box'>
                        <div className='Home_icon'>
                            <a href='/'>
                                <i className='fas fa-table'></i>
                            </a>
                        </div>
                        <div className='Home_text'>
                            <a href='/'>
                                <h3>The Product</h3>
                                <p>
                                    Simple and efficiant job applies status manger board.
                                </p>
                            </a>
                        </div>

                    </div>

                    <div className='Home_box'>

                        <div className='Home_icon'>
                            <a href='/'>
                                <i className='fas fa-briefcase'></i>
                            </a>
                        </div>

                        <div className='Home_text'>
                            <a href='/'>
                                <h3>The Purpose</h3>
                                <p>
                                    Allow job seekers to properly organize and manage their applies
                                </p>
                            </a>
                        </div>

                    </div>

                    <div className='Home_box'>

                        <div className='Home_icon'>
                            <a href='/'>
                                <i className='fas fa-user-friends'></i>
                            </a>
                        </div>

                        <div className='Home_text'>
                            <Link to='/about'>
                                <h3>The Group</h3>
                                <p>
                                    JR Full stack web developers.<br />
                                    Who created this platform from their own need.<br />
                                </p>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
export default Home;