import React from "react";
import {Carousel} from "antd";
import {CarouselRef} from "antd/lib/carousel";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCut} from "@fortawesome/free-solid-svg-icons";
import {BrowserRouter} from "react-router-dom";
import styles from "./styles.module.scss";
import placeholderCardImage from "../../asset/placeholder-250x250.png";
import placeholderAboutImage from "../../asset/Placeholder-500x500.png";
import reviews from "../../asset/homepage_reviews.json";

const Home: React.FC = () => {
    // Carousel component object reference
    let carousel: CarouselRef | null;

    // Go to next slide of the Carousel component
    function nextSlide() {
        carousel?.next();
    }

    // Go to previous slide of the Carousel component
    function prevSlide() {
        carousel?.prev();
    }

    // Carousel previous arrow element
    const CarouselPrevArrow = () => (
        <button type="button" onClick={prevSlide} className={`${styles.slickPrev} slick-arrow slick-prev`}>Prev</button>
    )
    // Carousel next arrow element
    const CarouselNextArrow = () => (
        <button type="button" onClick={nextSlide} className={`${styles.slickNext} slick-arrow slick-next`}>Next</button>
    )

    // Properties for the Carousel component
    const carouselProperties = {
        autoplay: true,
        arrows: true,
        nextArrow: <CarouselNextArrow/>,
        prevArrow: <CarouselPrevArrow/>,
        draggable: true,
        dots: false
    }

    // TODO update link when register component is available
    // Redirect to the register page
    function redirectToRegistration() {
        window.location.href = "/register";
    }

    return (
        <BrowserRouter>
            <section id="welcome" className={styles.welcome}>
                <div className={styles.welcomeContainer}>
                    <h1>Need to get rid of that ol' yee-yee *ss haircut? </h1>
                    <h2>Find a barber near you today!</h2>
                    <button type="button" onClick={redirectToRegistration} className={styles.primaryButton}>
                        Create an account now!
                    </button>
                </div>
            </section>
            <section id="howdoesitwork" className={styles.howdoesitwork}>
                <h1 className={styles.underlined}>How does it work?</h1>
                <div className={styles.cardContainer}>
                    <div className={styles.card}>
                        <img src={placeholderCardImage} alt="instruction image"/>
                        <div className={styles.step}><span>1</span></div>
                        <p>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat."
                        </p>
                    </div>
                    <div className={styles.card}>
                        <img src={placeholderCardImage} alt="instruction image"/>
                        <div className={styles.step}><span>2</span></div>
                        <p>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat."
                        </p>
                    </div>
                    <div className={styles.card}>
                        <img src={placeholderCardImage} alt="instruction image"/>
                        <div className={styles.step}><span>3</span></div>
                        <p>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat."
                        </p>
                    </div>
                </div>
            </section>
            <section id="about" className={styles.about}>
                <div>
                    <h1 className={styles.underlined}>About</h1>
                    <p>
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    </p>
                    <button type="button" className={styles.primaryButton}>Get to know us</button>
                </div>
                <img src={placeholderAboutImage} alt="about us image"/>
            </section>
            <section id="reviews" className={styles.reviews}>
                <div className={styles.reviewContainer}>
                    <Carousel ref={c => {
                        carousel = c
                    }} {...carouselProperties}>
                        {reviews && reviews.map(({id, author, message}) => (
                            <div className={styles.carouselSlide} key={id}>
                                <p>
                                    <span className={styles.reviewMessage}>"{message}"</span>
                                    <span>- {author}</span>
                                </p>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </section>
            <section id="footer" className={styles.footer}>
                <div className={styles.footerLogo}>
                    <FontAwesomeIcon icon={faCut} size="1x"/>
                    Barber2U
                </div>
                <div className={styles.footerContainer}>
                    <ul>
                        <span>Contact</span>
                        <li>Tel: 0612-345678</li>
                        <li>Email: info@barber2u.nl</li>
                        <li>Adres: Wibauthuis</li>
                    </ul>
                    <ul>
                        <li><a href="#howdoesitwork">How does it work?</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#reviews">Reviews</a></li>
                        <li><a href="#login">Login</a></li>
                    </ul>
                </div>
            </section>
        </BrowserRouter>
    );
}

export default Home;
