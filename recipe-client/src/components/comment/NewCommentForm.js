import Rating from '@mui/material/Rating';
import { useState } from 'react';
const NewCommentForm = props => {
    const [value, setValue] = useState(0);

    const getDataAndSubmit = (event) => {
        event.preventDefault();
        const fd = new FormData(event.currentTarget);
        props.submitForm(
            {
                rating: value,
                body: fd.get("body"),
                meal_id: props.meal_id
                
            }
        )
        event.target.reset();
    }

    return (
        <form onSubmit={getDataAndSubmit}>
            <div className='ms-3'>
                <div className="d-flex flex-column">
                    <Rating
                        name="rating"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    />
                    <label htmlFor="body"></label>
                    <textarea type="text" name="body" id="body" className="form-control w-50 mb-3 h-60 mt-3" />
                    <input type="submit" className="btn btn-primary mt-3 w-50"/>
                </div>
               
            </div>
        </form>
    )
}
export default NewCommentForm