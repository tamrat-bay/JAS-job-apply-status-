import React from 'react';
import AboutProfile from './AboutProfile';
import './About.css'


const profiles = [
    {
        name: 'Avshalom Mogos',
        img: 'https://png2.cleanpng.com/sh/16a0da26948c36caa861ba49522d7075/L0KzQYm3V8A2N6p2ipH0aYP2gLBuTfVud6Vue9H3LXXwf7vwTgNucZ1qkZ9sb33zhcXskr1qa5Dzi59wZXXuPYbpUBRkbmYAeaY6N3O7Poa8WMIyQWg7Sac8MEe6R4W6U8Y4OmIziNDw/kisspng-emoticon-emoji-smiley-computer-icons-geek-5b3dcf59a417c8.5582197615307774336721.png',
        email: 'avshalomogos@gmail.com',
        about: `I am a full stack web developer. I mainly work with PHP, HTML, CSS, JS and WordPress.
                 I also play well with Photoshop, Corel Draw, After Effects and other cool stuff.`,
        links: {
            github: 'https://github.com/Avshalom-Mogos',
            linkdin: 'https://www.linkedin.com/in/avshalom-mogos-a43584198/',
            facebook: 'https://www.facebook.com/profile.php?id=100003797195225'
        }
    },
    {
        name: 'Tamrat Bayeh',
        img: 'https://avatars2.githubusercontent.com/u/54495324?s=400&u=564349134a69d10752779c747b148997d548935b&v=4',
        email: 'bayeh.tamrat@gmail.com',
        about: `I am a full stack web developer. I mainly work with PHP, HTML, CSS, JS and WordPress.
                I also play well with Photoshop, Corel Draw, After Effects and other cool stuff.`,
        links: {
            github: 'https://github.com/tamrat-bay',
            linkdin: 'https://www.linkedin.com/in/tamrat-bayeh-6b1b53192/',
            facebook: 'https://www.facebook.com/tamrat.bayeh'
        }
    }
];

const About = () => {

    return (
        <div className='About'>
            <div className="About_profiles">
                {profiles.map(p => <AboutProfile key={p.name} profile={p} />)}
            </div>
        </div>
    );
};
export default About;