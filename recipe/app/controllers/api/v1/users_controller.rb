class Api::V1::UsersController < Api::ApplicationController
    def current
        render json: current_user
    end

    def create
        user_params = params.permit(:first_name, :last_name, :email, :password, :password_confirmation, :profile_img)
        user = User.new(user_params)
        if user.save!
            session[:user_id] = user.id
            render json:{id: user.id}
        else
            render(
                json:{error: user.errors.messages},
                status: 422
            )
        end
    end

    def favourited
        user = User.find(params[:id])
        meals = user.favourited_meals
        render(
            json: meals, each_serializer: MealCollectionSerializer
        )
    end

    def update_password
        user = User.find(params[:id])
        if user && user.authenticate(params[:current_password]) && !same_password?
            password = params[:new_password]
            password_confirmation = params[:new_password_confirmation]

            if can?(:update, user)
                if user.update(password: password, password_confirmation: password_confirmation)
                    render json:{id: user.id}
                else
                    render(
                        json: { errors: user.errors.messages },
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
    end

    def update_profile_image
        user = User.find(params[:id])
        user_params = params.permit(:profile_img)
        if can?(:crud, user)
            if user.update(user_params)
                render json:{id: user.id}
            else
                render(
                    json: { errors: user.errors.messages },
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

    def same_password?
        params[:current_password] == params[:new_password]
    end
end
