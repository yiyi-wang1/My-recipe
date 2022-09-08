class Api::V1::CategoriesController < ApplicationController
    def show
        category = Category.find(params[:id])
        meals = category.meals
        render(
            json: meals, each_serializer: MealCollectionSerializer
        )
    end
end
