import React from 'react';


const AboutProfile = (props) => {

    const { name, email, img, about, links } = props.profile;

    return (
        <div className='About_Profile'>
            <aside className='profile-card shadow-drop-center'>

                <header>
                    <a href='https://tutsplus.com' target='_blank' rel='noopener noreferrer'>
                        <img src={img} alt='avatar' />
                    </a>

                    <h1>{name}</h1>

                    {/* <!-- and role or location --> */}
                    <h2>- Full Stack Web Developer-</h2>
                </header>
                {/* <!-- bit of a bio; who are you? --> */}
                <div className='profile-bio'>
                    <p className='email'>{email}</p>
                    <p>Hello there!</p>
                    <p>
                        {about}
                    </p>
                </div>
                {/* <!-- some social links to show off --> */}
                <ul className='profile-social-links'>
                    {/* <!-- twitter - el clásico  --> */}
                    <li>
                        <a href={links.github} target='_blank' rel='noopener noreferrer'>
                            {/* <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/social-twitter.svg' /> */}
                            <i className='fab fa-github' style={{ color: 'black' }}></i>
                        </a>
                    </li>
                    {/* <!-- envato – use this one to link to your marketplace profile --> */}
                    <li>
                        <a href={links.linkdin} target='_blank' rel='noopener noreferrer'>
                            {/* <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/social-envato.svg'  /> */}
                            <i className='fab fa-linkedin' style={{ color: '#0077B5' }}></i>
                        </a>
                    </li>
                    {/* <!-- codepen - your codepen profile--> */}
                    <li>
                        <a href={links.facebook} target='_blank' rel='noopener noreferrer'>
                            <i className='fab fa-facebook' style={{ color: '#4267B2' }}></i>
                        </a>
                    </li>
                    {/* <!-- add or remove social profiles as you see fit --> */}
                </ul>
            </aside>
        </div>
    )
};
export default AboutProfile;
