class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :full_name, :provider, :email, :profile_img

  has_many :comments
  has_many :meals

  def profile_img
    if object.profile_img.attached?
      {
        url: rails_blob_url(object.profile_img)
      }
    end
  end

  class CommentSerializer < ActiveModel::Serializer
    include Rails.application.routes.url_helpers
    attributes :body, :rating, :created_at, :meal_id, :meal_title, :author_full_name, :author_profile_img

    def meal_title
      object.meal&.title
    end

    def author_full_name
      object.user&.full_name
    end

    def author_profile_img
      if object.user&.profile_img.attached?
        {
          url: rails_blob_url(object.user&.profile_img)
        }
      end
    end

  end

  class MealSerializer < ActiveModel::Serializer
    attributes :id, :title, :description, :created_at, :images
    include Rails.application.routes.url_helpers
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

end
