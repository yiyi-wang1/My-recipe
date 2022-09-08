import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from 'react';
import { Meal } from '../requests'
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress'

const HomePage = () => {
    const [top5Meals, setTop5Meals] = useState([])
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        Meal.top5().then((data) => {
            setTop5Meals(data);
            setIsLoaded(true)
        })
    },[])

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 3000,
        pauseOnHover: true
    };

    return (
        <>
            {isLoaded ? (
                <div className="container w-50">
                    <div>
                        <h3 className="mt-5 mb-3 text-center">What's popular</h3>
                        <Slider {...settings}>
                                    {top5Meals.map((meal, i) => (
                                        <div key={i}>
                                            <Link to={`/meals/${meal.id}`} className="link">
                                            {meal.images?
                                                (<img className= "w-100 ms-6 me-6" src={meal.images[0].url} alt='' />
                                                ) : (
                                                    <div>{ meal.title }</div>
                                                )
                                                }
                                            </Link>
                                        </div>
                                ))}
                        </Slider>
                    </div>
                </div>
            ):(
                <CircularProgress />
                )}
        </>


    )
}

export default HomePage;