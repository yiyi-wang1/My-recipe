class Api::V1::SearchController <  Api::ApplicationController
    def search
        if params[:keyword].nil?
            result = []
        else
            result = Meal.search params[:keyword]
            meals = []
            result.each do |meal|
                meals << Meal.find_by_id(meal._source.id)
            end
            render(
                json: meals, each_serializer: MealCollectionSerializer
            )
        end
    end
end
