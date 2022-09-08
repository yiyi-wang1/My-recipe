class FavouriteSerializer < ActiveModel::Serializer
  attributes :id, :meal_id, :user_id
end
