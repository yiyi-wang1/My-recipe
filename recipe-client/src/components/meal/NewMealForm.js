import { useForm, useFieldArray } from "react-hook-form";
const NewMealForm = (props) => {

    const { register, handleSubmit, formState: { errors }, control } = useForm();
    const {
        fields: stepFields,
        append: stepAppend,
        remove: stepRemove
    } = useFieldArray({
        control,
        name: 'steps'
    })

    const getDataAndSubmit = (data, event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('video_url', data.video_url);
        formData.append('time', data.time);
        formData.append('ingredients', data.ingredients);
        formData.append('category_name', data.category_name);
        
        for (var i = 0; i < data.steps.length; i++) {
            formData.append('steps[]', data.steps[i]);
        }

        for (var i = 0; i < data.images.length; i++) {
            formData.append('images[]', data.images[i]);
        }
        
        props.submitForm(
            formData
        )
        event.target.reset();
    }

    return (
        <div className="container w-50 mb-5">
            <form onSubmit={handleSubmit(getDataAndSubmit)}>
                <div className="mt-3">
                    <label htmlFor="title">Title</label>
                    <br />
                    <input {...register("title")} type="text" className="form-control"/>
                </div>
                <div className="mt-3">
                    <label htmlFor="description">Description</label>
                    <br />
                    <textarea {...register("description")} type="text" className="form-control"/>
                </div>
                <div className="mt-3">
                    <label htmlFor="video_url">Video Link</label>
                    <br />
                    <input {...register("video_url")} type="text" className="form-control"/>
                </div>
                <div className="mt-3">
                    <label htmlFor="time">Cook Time</label>
                    <br />
                    <input {...register("time")} type="number" className="form-control"/>
                </div>
                <div className="mt-3">
                    <label htmlFor="ingredients">Ingredients</label>
                    <br />
                    <textarea {...register("ingredients")} type="text" className="form-control"/>
                </div>
                <div className="mt-3">
                    <label htmlFor="category">Category</label>
                    <select {...register("category_name")} className="form-select">
                        <option value="Appetizer">Appetizer</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Drink">Drink</option>
                        <option value="Soup">Soup</option>
                    </select>
                </div>
                <div className="mt-3">
                    <label htmlFor="time">Steps</label>
                    <br />
                    {stepFields.map((field, index) => (
                        <div key={index} className="d-flex flex-row align-items-center">
                            <textarea
                            key={field.id} 
                            {...register(`steps.${index}`)} 
                            className="flex-grow-1 mt-3 form-control"    
                            />
                            <button type="button" onClick={() => stepRemove(index)} className="btn btn-outline-danger h-50 ms-3">Delete</button>
                        </div>
                       
                    ))}
                    <button type="button" onClick={() => stepAppend()} className="btn btn-outline-primary mt-3">Append</button>
                </div>

                <div className="mt-3">
                    <label htmlFor="images">Photos</label>
                    <br />
                    <input {...register("images")} type="file" accept="image/*" multiple className="form-control"/>
                </div>
                <div className="mt-3">
                    <input type="submit" value="Create Meal" className="btn btn-primary w-100"/>
                </div>
            </form>
        </div>
        
    )
}
export default NewMealForm