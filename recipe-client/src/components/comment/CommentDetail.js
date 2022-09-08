import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import { Avatar } from '@mui/material';

const CommentDetail = (props) => {
    const date = new Date(props.created_at);
    return (
        <>
            <div className="mt-3 d-flex flex-row align-items-center mb-2">
                <div className="d-flex flex-column align-items-center me-3">
                    <Avatar src={props.author_image} alt="profile" />
                    <p>{ props.author}</p>
                </div>
                <div className="d-flex flex-column ms-3">
                    <Rating name="read-only" value={props.rating} readOnly />
                    <p>
                        {props.body}
                    </p>
                    <small>
                        Posted on {date.toLocaleDateString()}
                    </small>
                </div>
            </div>
            <Divider variant="middle" />
        </>
        
    )
}

export default CommentDetail;