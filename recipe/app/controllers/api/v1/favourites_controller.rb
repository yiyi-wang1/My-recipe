class Api::V1::FavouritesController < Api::ApplicationController
    before_action :authenticate_user!

    def create
        meal = Meal.find (params[:meal_id])
        favourite = Favourite.new(meal: meal, user: current_user)
        if favourite.save!
            render(
                json: { id: favourite.id }
            )
        else
            render(
                json: { errors: favourite.errors.messages },
                status: 422
            )
        end
    end

    def destroy
        favourite = current_user.favourites.find params[:id]

        if cannot?(:destroy, favourite)
            render(
                json: { errors: "Not authorized" },
                status: 401
            )
        elsif favourite.destroy
            render(
                json: { status: 200 }
            )
        else
            render(
                json: { errors: favourite.errors.messages },
                status: 422
            )
        end
    end
end
