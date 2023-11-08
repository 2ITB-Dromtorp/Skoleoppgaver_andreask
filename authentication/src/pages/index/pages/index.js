import './index.css';

import { Link } from 'react-router-dom';

function Card({ className, name, desc, children, ...props }) {
    return (
        <div className={className}>
            <div className='home_card_content'>
                {children}
            </div>
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
        <Card className='home_card home_card_large' {...props}>
            {children}
        </Card>
    );
}

function SmallCard({ children, ...props }) {
    return (
        <Card className='home_card home_card_small' {...props}>
            {children}
        </Card>
    );
}

const Index = ({ ...props }) => {
    return (
        <>
            <section id='top_section'>
                <h1 className='welcome_header'>The Best Document Editor made with React</h1>
                <Link className='button fancy_button secondary' to='/login'>Login</Link>
                <Link className='button fancy_button primary' to='/documents'>Documents</Link>
            </section>
            <section id='cards_section'>
                <LargeCard name='Popular among companies' desc='Used by all the major companies in NobodyVille. And when i say all the major i mean 100% of them.'>
                    <img src='https://previews.123rf.com/images/ab7272/ab72722004/ab7272200400182/143862490-a-big-black-african-pig-with-a-dirty-face-looks-straight-at-the-camera-through-the-bars-the-concept.jpg' />
                </LargeCard>
                <LargeCard name='Specialized for everybody' desc={`Specialized to fit every persons needs, whether you're a working privately or a businessman.`}>
                    <img src='https://previews.123rf.com/images/ab7272/ab72722004/ab7272200400182/143862490-a-big-black-african-pig-with-a-dirty-face-looks-straight-at-the-camera-through-the-bars-the-concept.jpg' />
                </LargeCard>
                <LargeCard name='Specialized for everybody' desc={`Specialized to fit every persons needs, whether you're a working privately or a businessman.`}>
                    <img src='https://previews.123rf.com/images/ab7272/ab72722004/ab7272200400182/143862490-a-big-black-african-pig-with-a-dirty-face-looks-straight-at-the-camera-through-the-bars-the-concept.jpg' />
                </LargeCard>
                <SmallCard name='Optimized' desc={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. `}>

                </SmallCard>
                <SmallCard name='Developed by the best' desc={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. `}>

                </SmallCard>
                <SmallCard name='Maintained' desc={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. `}>

                </SmallCard>
                <SmallCard name='Simply the best' desc={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. `}>

                </SmallCard>
                <SmallCard name='Word sucks use this instead' desc={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. `}>

                </SmallCard>
                <SmallCard name='The future' desc={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. `}>

                </SmallCard>
            </section>
        </>
    );
}

export default Index;