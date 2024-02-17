import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag } from '@fortawesome/free-solid-svg-icons'
import "./Home.scss"

const facilities = [
    {
        title: 'Bastketball Court',
        image: 'https://c1.facilitron.com/assets/img/FacilityType_basketball_245.ca7a2bf7.jpg',
    },
    {
        title: 'Theaters',
        image: 'https://c1.facilitron.com/assets/img/FacilityType_theater_245.bc4a41e3.jpg',
    },
    {
        title: 'Football Fields',
        image: 'https://c1.facilitron.com/assets/img/FacilityType_football_245.c2605a2b.jpg',
    },
    {
        title: 'Gyms',
        image: 'https://c1.facilitron.com/assets/img/FacilityType_gymnasium_245.230bb2e1.jpg',
    },
    {
        title: 'Pools',
        image: 'https://c1.facilitron.com/assets/img/FacilityType_pool_245.2ddf7b47.jpg',
    }
];

function Home() {
    return (
        <div className="content">

            <div className="alert-top">
                <p classname="alert has-text-centered">
                    <FontAwesomeIcon icon={faFlag} style={{ color: "#63E6BE", }} /> Learn more about listing and managing your facilities with Facilitron.
                    <span style={{ color: "#3b94db" }}>
                        <strong> Book a Demo ➝</strong>
                    </span>
                </p>
            </div>

            <div className="promotion">
                <section className="banner">
                    <div className="search_box">
                        <h2>
                            Search for a classroom, athletic field, or other venue
                        </h2>
                    </div>
                    <div className="slogan">
                        <h1>
                            We bring communities and spaces together.
                        </h1>
                        <p class="subtitle is-5">
                            <strong class="has-text-white">
                                SportScape Connect helps community members search and request public event spaces in their local area.
                            </strong>
                        </p>
                    </div>
                </section>
            </div>

            <div className="ad">
                <div className="box">
                    <div className="column">
                        <div className="icon-wrapper">
                            <img
                                src="https://c1.facilitron.com/assets/img/facilitron-fit-mobile.231c9f0d.png"
                                alt="SportScape Works work order management software"
                                className="image"
                            />
                        </div>
                    </div>

                    <div className="column">
                        <span style={{ display: 'inline-block', marginTop: 31, color: '#2473b3', fontSize: '0.8rem' }}>
                            NEW PRODUCT
                        </span>
                        <h3>
                            California districts: Conduct and submit Williams Act “FIT” inspections with SportScape FIT™
                        </h3>
                        <p>
                            SportScape’s new property inspector for SportScape Works™ lets you conduct and submit facility inspections including California’s Williams Act inspection right from your mobile device. Introducing SportScape FIT™ the Facility Inspection Tool that makes facility inspections less time-consuming and less error prone. From inspection to SAB form output, do it all with just one tool. Schedule a demo or talk to your account manager to get started.
                        </p>
                        <a href="">Schedule a demo</a> or talk to your account manager to get started.
                    </div>
                </div>
            </div>

            <div className="category">
                <h3>Facilities for rent</h3>
                <p className="subtitle">
                    We feature a variety of auditoriums, gyms, classrooms, and other venue
                    options available for community use.
                </p>
                <div className="list">
                    {facilities.map((facility) => (
                        <div className="card main" key={facility.title}>
                            <div className="card image">
                                <figure className="image">
                                    <img
                                        src={facility.image}
                                        alt={facility.title}
                                        lazy="loaded"
                                    />
                                </figure>
                            </div>
                            <div className="card-content">
                                <h5>{facility.title}</h5>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="popular">
                <h3>Interesting spaces</h3>
                <p className="subtitle">
                    Browse a few examples of the types of facilities available to rent.
                </p>
            </div>
        </div>
    )
}

export default Home;