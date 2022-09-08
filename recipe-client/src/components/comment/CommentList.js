import CommentDetail from './CommentDetail'

const CommentList = (props) => {
    return (
        <div className="mb-4">
            <h4 className="text-decoration-underline ms-3">Comments</h4>
            <div className="ms-3">
                {
                    props.list?.map((c, i) => {
                        return <CommentDetail
                            key={i}
                            rating={c.rating}
                            body={c.body}
                            created_at={c.created_at}
                            author={c.author_full_name}
                            author_image={c.author_profile_img?.url}
                        />
                    })
                }
            </div>
        </div>
    )
}

export default CommentList;