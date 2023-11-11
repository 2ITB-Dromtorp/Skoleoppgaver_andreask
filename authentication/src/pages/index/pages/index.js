import './index.css';

import { Link } from 'react-router-dom';

function Card({ type, className, name, desc, children, ...props }) {
    let content;
    if (type === 'large') {
        content = (
            <div className='home_card_content'>
                {children}
            </div>
        );
    }
    return (
        <div className={'home_card' + (className ? ' ' + className : '')}>
            {content}
            <div className='home_card_name'>
                {name}
            </div>
            <div className='home_card_desc'>
                {desc}
            </div>
        </div>
    );
}

function LargeCard({ children, ...props }) {
    return (
        <Card type='large' className='home_card_large' {...props}>
            {children}
        </Card>
    );
}

function SmallCard({ children, ...props }) {
    return (
        <Card type='small' className='home_card_small' {...props}>
            {children}
        </Card>
    );
}

const Index = ({ ...props }) => {
    return (
        <section id='home_section' className='main_content'>
            <section id='top_section'>
                <h1 id='top_header'>The Best Document Editor made with React</h1>
                <p id='top_desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <div id='top_section_buttons'>
                    <Link className='button fancy_button secondary' to='/login'>Login</Link>
                    <Link className='button fancy_button primary' to='/documents'>Get started</Link>
                </div>
            </section>
            <div id='card_section_intro'>
                <h2 id='card_section_header'>
                    What is Doctor?
                </h2>
                <p id='card_section_desc'>
                    All the tools you need to create and manage documents.
                </p>
            </div>
            <section id='card_section'>
                <LargeCard name='Popular among companies' desc='Used by all the major companies in NobodyVille. And when i say all the major i mean 100% of them.'>
                    <img className='home_card_image' src='https://previews.123rf.com/images/ab7272/ab72722004/ab7272200400182/143862490-a-big-black-african-pig-with-a-dirty-face-looks-straight-at-the-camera-through-the-bars-the-concept.jpg' />
                </LargeCard>
                <LargeCard name='Specialized for anybody' desc={`Specialized to fit any persons needs, whether you're working privately or a businessman.`}>
                    <img className='home_card_image' src='https://previews.123rf.com/images/ab7272/ab72722004/ab7272200400182/143862490-a-big-black-african-pig-with-a-dirty-face-looks-straight-at-the-camera-through-the-bars-the-concept.jpg' />
                </LargeCard>
                <LargeCard name='Simplifies the daily life' desc={`Made to be easy to use and uncomplicated while still performing complicated tasks effortlessly.`}>
                    <img className='home_card_image' src='https://previews.123rf.com/images/ab7272/ab72722004/ab7272200400182/143862490-a-big-black-african-pig-with-a-dirty-face-looks-straight-at-the-camera-through-the-bars-the-concept.jpg' />
                </LargeCard>
                <SmallCard name='Optimized' desc={`Optimized to run optimal on 2012 androids. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. `}>

                </SmallCard>
                <SmallCard name='Developed by the best' desc={`Developed by me obviously. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}>

                </SmallCard>
                <SmallCard name='Maintained' desc={`Maintained by me obviously. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}>

                </SmallCard>
                <SmallCard name='Simply the best' desc={`Its the best cuz its made by me. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}>

                </SmallCard>
                <SmallCard name='Word sucks use this instead' desc={`Word is overrated. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}>

                </SmallCard>
                <SmallCard name='The future' desc={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}>

                </SmallCard>
            </section>
        </section>
    );
}

export default Index;