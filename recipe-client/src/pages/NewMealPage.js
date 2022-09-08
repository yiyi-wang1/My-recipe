import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Meal } from '../requests';
import NewMealForm from '../components/meal/NewMealForm';
import { CircularProgress } from '@mui/material';

const NewMealPage = () => {
    const navigate = useNavigate();
    const [uploaded, setIsUploaded] = useState(true);

    function createNewMeal(params) {
        setIsUploaded(false)
        Meal.create(params)
            .then((meal) => {
                if (meal.errors) {
                    console.log(`MealErrors: ${meal.errors}`);

                } else {
                    setIsUploaded(true)
                    navigate(`/meals/${meal.id}`);
                }
            })
    }

    return (
        <>
            {
                uploaded?(
                    <div>
                        <NewMealForm submitForm={(params) => createNewMeal(params)} />
                    </div>
                ):(
                    <CircularProgress />
                )
            }
        </>
        
    )
}

export default NewMealPage;