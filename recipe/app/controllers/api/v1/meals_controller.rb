class Api::V1::MealsController < Api::ApplicationController
    before_action :authenticate_user!, except: [:index, :show, :top5]

    def create
        meal = Meal.new(get_params)
        meal.user = current_user
        if meal.save!
            render(
                json: meal, each_serializer: MealSerializer
            )
        else
            render(
                json: { errors: meal.errors.messages },
                status: 422
            )
        end
    end

    def index
        meals = Meal.order(created_at: :desc)
        render(
            json: meals, each_serializer: MealCollectionSerializer
        )
    end

    def show
        meal = Meal.find(params[:id])
        favourite = meal.favourites.find_by(user: current_user)
        render(
            json: meal, each_serializer: MealSerializer
        )
    end

    def update
        meal = Meal.find(params[:id])
        if can?(:update, meal)
            if meal.update(get_params)
                render(
                    json :meal, each_serializer: MealSerializer
                )
            else
                render(
                    json: { errors: meal.errors.messages },
                    status: 422 
                )
            end
        else
            render(
                json: { errors: "Not authorized" },
                status: 401
            )
        end
    end

    def destroy
        meal = Meal.find(params[:id])
        if can?(:crud, meal)
            if meal.destroy
                render json: { status: 200 }
            else
                render json: { status: 500 }
            end
        else
            render(
                json: { errors: "Not authorized" },
                status: 401
            )
        end
    end

    def top5
        meals = Meal.joins(:comments).group('meals.id').order('avg(comments.rating) desc').limit(5)
        render(
            json: meals, each_serializer: MealCollectionSerializer
        )
    end

    def get_params
        params.permit(:title, :description, :video_url, :time, :ingredients, :category_name, :images => [], :steps => [])
    end
end
