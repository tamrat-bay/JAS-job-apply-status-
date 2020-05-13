import React from 'react';
import './About.css'
import AboutProfile from './AboutProfile';

const About = () => {
    const profiles = [
        {name:'Tamrat Bayeh', 
        img : 'https://avatars2.githubusercontent.com/u/54495324?s=400&u=564349134a69d10752779c747b148997d548935b&v=4' ,
        email:'bayeh.tamrat@gmail.com',
        about: '',
        links:{
            github:'https://github.com/tamrat-bay',
            linkdin:'',
            facebook:'https://www.facebook.com/tamrat.bayeh'
         } 
    },
        {name:'Avshalum Mogos', 
        img : '' ,
        email:'',
        about: '',
        links:{
            github:'',
            linkdin:'',
            facebook:''
         } 
    }

    ]
    return (
        <div className='About'>
            <AboutProfile profile={profiles[0]} />
        </div>
    )
}

export default About
