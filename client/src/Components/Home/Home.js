import React from 'react';
import './Home.css'

const Home = () => {
    return (
        <div className="Home">
            <header>
            <section className="Home_titles">

                <h1>JAS</h1>
                <p>Go get your dream job</p>

            </section>

            <section className="Home_container-boxes">
                <div className="Home_box">

                    <div className="Home_icon">
                        <a href=""><i className="fas fa-fire"></i></a>
                    </div>

                    <div className="Home_text">
                        <a href="">
                            <h3>The Product</h3>
                            <p>Simple and efficiant job applies status manger board.
                                 to help you track your applies and their current status.</p>
                        </a>
                    </div>

                </div>

                <div className="Home_box">

                    <div className="Home_icon">
                        <a href=""><i className="fa fa-seedling"></i></a>
                    </div>

                    <div className="Home_text">
                        <a href="">
                            <h3>The Purpose</h3>
                            <p>We will use only animal-friendly, fair-trade yarn. Only the best!</p>
                        </a>
                    </div>

                </div>

                <div className="Home_box">

                    <div className="Home_icon">
                        <a href=""><i className="fas fa-address-card"></i></a>
                    </div>

                    <div className="Home_text">
                        <a href="">
                            <h3>The Group</h3>
                            <p>Become a member, become family. Teamwork is everything.</p>
                        </a>
                    </div>

                </div>
            </section>
            </header>

            <div className="Home_body">
                <h3>The Product</h3>
                            <p>Simple and efficiant job applies status manger board.
                                 to help you track your applies and their current status.
                            </p>
            </div>
            <div className="Home_body product">
                <h3>The Product</h3>
                            <p>Simple and efficiant job applies status manger board.
                                 to help you track your applies and their current status.
                            </p>
            </div>
            <div className="Home_body">
                <h3>The Product</h3>
                            <p>Simple and efficiant job applies status manger board.
                                 to help you track your applies and their current status.
                            </p>
            </div>
        </div>
    )
}

export default Home
