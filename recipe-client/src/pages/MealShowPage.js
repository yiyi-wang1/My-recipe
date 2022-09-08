import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MealDetails from '../components/meal/MealDetails'
import CommentList from '../components/comment/CommentList'
import { Meal, Comment, Favourite, User } from '../requests'
import NewCommentForm from '../components/comment/NewCommentForm'
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress'

const MealShowPage = () => {
    const params = useParams();

    const [meal, setMeal] = useState({});
    const [favouriteId, setFavoriteId] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        Meal.show(params.id)
            .then((data) => {
                setMeal(data)
                findFavourite(data.favourites)
                setIsLoaded(true)
            })
       
    }, [params.id])

    useEffect(() => {

    },[favouriteId])


    function createNewComment(params){
        Comment.create(params)
        .then((data) => {
            if (data.errors) {
                console.log(`Comment Errors: ${data.errors}`);
            } else {
                setMeal(data);
            }
        })
    }

    function findFavourite(list) {
        User.current().then(user => {
            if (user && list) {
                list.forEach(favourite => {
                    if (favourite.user_id === user.id) {
                        setFavoriteId(favourite.id);
                    }
                })
            }
        })
    }

    function addFavourite() {
        const params = {
            meal_id: meal.id
        }
        Favourite.create(params)
        .then((data) => {
            if (data.errors) {
                console.log(`Favourite Errors: ${data.errors}`);
            } else {
                setFavoriteId(data.id)
            }
        })
    }

    function removeFavourite() {
        Favourite.destroy(favouriteId).then((res) => {
            if (res.errors) {
                console.log(`Favourite Errors: ${res.errors}`);
            }else {
                setFavoriteId("")
            }
        })
    }

    const { id, title, description, video_url, time, ingredients, created_at, steps, verified, images, owner, category} = meal;
    return (
        <>
            {isLoaded?
                (
                    <div className="container">
                        <MealDetails 
                            title={title}
                            description={description}
                            video_url={video_url}
                            time={time}
                            ingredients={ingredients}
                            created_at={created_at}
                            steps={steps}
                            verified={verified}
                            images={images}
                            favourite={favouriteId}
                            owner={owner}
                            category={category}
                            addFavourite={addFavourite}
                            removeFavourite={removeFavourite}
                        />
                        <h4 className="ms-3">Leave Comment</h4>
                        <NewCommentForm meal_id={id} submitForm={(params) => createNewComment(params)} />
                        <br className='mt-3'></br>
                        <Divider variant="middle" />
                        <CommentList list={meal.comments}/>
                    </div>
                ) : (
                    <CircularProgress />
                )
        }
        </>

    )
}

export default MealShowPage 