import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Category } from '../requests'
import CircularProgress from '@mui/material/CircularProgress'

function CategoryPage() {
    const [meals, setMeals] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const params = useParams();

    useEffect(() => {
        Category.show(params.id)
        .then((data) => {
            setMeals(data)
            setIsLoaded(true)
        })
    },[params.id])

    return (
        <>
            {
                isLoaded ? (
                    <div className='container'>
                        <h1 className="header">All Recipes</h1>
                        <div className="mt-3 d-flex flex-row flex-wrap">
                            {meals.map((m, i) => {
                                const date = new Date(m.created_at);
                                return (
                                    <div key={i} className="m-3 card card-width shadow-sm">
                                        <Link to={`/categories/${m.category_id}`} className="ms-3 mt-1"><span className="badge bg-primary">{m.category_name}</span></Link>
                                        {m.images?
                                                    (<img className= "card-img-top p-3" src={m.images[0].url} alt='' />
                                                    ) : (
                                                    <img className= "card-img-top p-3" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png"/>)
                                        }
                                        <div className="card-body">
                                            <h5 className="card-title text-center"><Link to={`/meals/${m.id}`}>{m.title}</Link></h5>
                                            <small> Posted on {date.toLocaleDateString()}</small>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ): (
                    <CircularProgress />
                )
            }
        </>
       
    )
}

export default CategoryPage