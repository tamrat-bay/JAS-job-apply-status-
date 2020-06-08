import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './Footer.css';


const Footer = () => {
    return (

        <footer id='footer' className='footer-1'>
            <div className='main-footer widgets-dark typo-light'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-xs-12 col-sm-6 col-md-3'>
                            <div className='widget subscribe no-box'>
                                <h5 className='widget-title'>Job Apply Status <span></span></h5>
                                <p>Manage your job applies today!  For free!</p>
                            
                            </div>
                        </div>
                        <div className='col-xs-12 col-sm-6 col-md-3'>
                            <div className='widget no-box'>
                                <h5 className='widget-title'>Quick Links<span></span></h5>
                                <ul className='thumbnail-widget'>
                                    <li>
                                        <div className='thumb-content'><Link to='/about'>About us</Link></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-xs-12 col-sm-6 col-md-3 mb-3'>
                            <div className='widget no-box'>
                                <h5 className='widget-title'>Get Started<span></span></h5>
                                <p className='get-started-p'>Access your apllies and more.</p>
                                <Button as={Link} className='btn' to='/signup'>Sign Up Now</Button>
                            </div>
                        </div>
                        <div className='col-xs-12 col-sm-6 col-md-3'>
                            <div className='widget no-box'>
                                <h5 className='widget-title'>Contact Us<span></span></h5>
                                <p><a href='mailto:jobApplyStatus@gmail.com' title='glorythemes'>jobApplyStatus@gmail.com</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='footer-copyright'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12 text-center'>
                            <p>Copyright JAS © 2020. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;