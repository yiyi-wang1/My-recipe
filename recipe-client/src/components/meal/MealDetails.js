import {
    EmailShareButton,
    FacebookShareButton,
    TwitterShareButton,
    EmailIcon,
    FacebookIcon,
    TwitterIcon
} from "react-share";
import { useParams, Link } from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import Avatar from '@mui/material/Avatar';

const MealDetails = (props) => {
    const { title, description, video_url, time, ingredients, created_at, steps, verified, images, favourite, addFavourite, removeFavourite, owner, category } = props;
    const url_list = video_url.split("=");
    const embed_video_url = `https://www.youtube.com/embed/${url_list[url_list.length - 1]}`
    const params = useParams();
    const url = `http://localhost:3001/meals/${params.id}`

    return(
        <div className="container d-flex flex-column" >
            <div className="m-3">
                 <h2>
                    {title}
                </h2>
                {favourite ? (<button onClick={removeFavourite} className="btn"><MdFavorite /> UnFavourite</button>) : (<button onClick={addFavourite} className="btn"><MdFavoriteBorder /> Add Favourite</button>)}
                <Link to={`/categories/${category.id}`}><span class="badge bg-primary">{ category.name}</span></Link>
            </div>
            <div className="m-3 d-flex flex-row">
                <div>Share the recipe with community</div>
                <div className="d-flex flex-row ms-3">
                    <FacebookShareButton url={url} quote={title}>
                    <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <TwitterShareButton title={title} url={url}>
                    <TwitterIcon size={32} round />
                    </TwitterShareButton>

                    <EmailShareButton url={url} subject={"Check out this recipe: " + title} body="I find a new recipe for you! Please check out by the link">
                    <EmailIcon size={32} round />
                    </EmailShareButton>
                    </div>
            </div>
            <div className="d-flex flex-column m-3">
                <div className="d-flex flex-row justify-content-around">
                    {images?
                        (
                            <Carousel width="700px" showArrows={false}>
                            <div>
                                {video_url ? (<iframe src={embed_video_url} width="700" height="360" className="m-0"></iframe>) : (<p>No video avaliable</p>)}
                                <img />
                            </div>
                            {images?.map((image, i) => {
                                return (
                                    <div key={i}>
                                         <img src={image.url} alt="recipe"/>
                                    </div>
                                   
                                )
                            })}
                            </Carousel>
                        ) : (
                            <div>
                            {
                                video_url ?
                                (<iframe src={embed_video_url} width="700" height="360" className="m-0"></iframe>):( <img className="card-img-top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png" />)
                            }
                            </div>
                        )
                    }
                    
                    <div className="card p-3 card-width pt-5 text-center">
                        <h5>Cook Time</h5>
                        <p>{time} Minutes</p>
                        <h5>Ingredients</h5>
                        <p>{ingredients}</p>
                        <h5>Number of Steps</h5>
                        <p>{steps.length}</p>
                        {verified ? (<small>Verified Meal. Can order</small>) : (
                            <div className="d-flex flex-column align-items-center">
                                <h5>Provided by</h5>
                                <Avatar src={owner.profile_img.url} alt={owner.full_name} sx={{ width: 75, height: 75 }}/>
                                <p className="mt-2">{owner.full_name}</p>
                            </div>
                        )}
                    </div>
                </div>
                    <h5>Description</h5>
                    <p className="me-3 text-break">
                        {description}
                    </p>
                <div>
                    {steps?.map((step, i) =>{
                        return (
                            <div key={i}>
                                <h5>Step {i + 1}</h5>
                                <p>{step}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default MealDetails;