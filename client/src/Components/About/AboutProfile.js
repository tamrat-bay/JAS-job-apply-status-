import React from 'react'

const AboutProfile = (props) => {
    const {name , email ,img} = props
    return (
        <div className="About_Profile">
            <aside class="profile-card">

                <header>

                {/* <!-- here’s the avatar --> */}
                <a href="https://tutsplus.com">
                    <img src="https://randomuser.me/api/portraits/men/99.jpg" />
                </a>

                {/* <!-- the username --> */}
                <h1>George Darkos</h1>

                {/* <!-- and role or location --> */}
                <h2>- Full Stack Web Developer -</h2>

                </header>

                {/* <!-- bit of a bio; who are you? --> */}
                <div class="profile-bio">

                <p>Hello there!</p>
                <p>I am a full stack web developer. I mainly work with PHP, HTML, CSS, JS and WordPress.
                    <br />I also play well with Photoshop, Corel Draw, After Effects and other cool stuff.</p>

                </div>

                {/* <!-- some social links to show off --> */}
                <ul class="profile-social-links">

                {/* <!-- twitter - el clásico  --> */}
                <li>
                    <a href="https://twitter.com/tutsplus">
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/social-twitter.svg" />
                    </a>
                </li>

                {/* <!-- envato – use this one to link to your marketplace profile --> */}
                <li>
                    <a href="https://envato.com">
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/social-envato.svg"  />
                    </a>
                </li>

                {/* <!-- codepen - your codepen profile--> */}
                <li>
                    <a href="https://codepen.io/tutsplus">
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/social-codepen.svg" />
                    </a>
                </li>

                {/* <!-- add or remove social profiles as you see fit --> */}

                </ul>

                </aside>
        </div>
    )
}

export default AboutProfile
