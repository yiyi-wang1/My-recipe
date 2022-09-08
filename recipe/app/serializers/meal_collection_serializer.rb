class MealCollectionSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers  
  attributes :id, :title, :time, :created_at, :images, :category_name, :category_id

  def category_name
    object.category.name
  end

  def category_id
    object.category.id
  end

  def images
    if object.images.attached?
      images = []
      object.images.each do |image|
        images << { url: rails_blob_url(image)}
      end
      return images
    end
  end
end