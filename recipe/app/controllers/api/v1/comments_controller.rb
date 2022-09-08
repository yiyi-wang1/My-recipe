class Api::V1::CommentsController < Api::ApplicationController
    before_action :authenticate_user!

    def create
        comment = Comment.new(params.require(:comment).permit(:body, :rating, :meal_id))
        comment.meal = Meal.find(comment.meal_id)
        comment.user = current_user
        if comment.save!
            render(
                json: comment.meal, each_serializer: MealSerializer
            )
        else
            render(
                json: { errors: comment.errors.messages },
                status: 422
            )
        end
    end

    def destroy
        comment = Comment.find(params[:id])
        if can?(:destroy, comment)
            comment.destroy
            render(
                json: { status: 200 }
            )
        else
            render(
                json: { errors: "Not authorized" },
                status: 401
            )
        end

    end
end
