class MealSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :title, :description, :video_url, :time, :ingredients, :created_at, :steps, :verified, :images, :favourites

  belongs_to :user, key: :owner
  belongs_to :category

  has_many :comments
  has_many :favourites

  def images
    if object.images.attached?
      images = []
      object.images.each do |image|
        images << { url: rails_blob_url(image)}
      end
      return images
    end
  end

  class CommentSerializer < ActiveModel::Serializer
    include Rails.application.routes.url_helpers
    attributes :body, :rating, :created_at, :author_full_name, :author_profile_img

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

  class UserSerializer < ActiveModel::Serializer
    include Rails.application.routes.url_helpers
    attributes :id, :full_name, :profile_img

    def profile_img
      if object.profile_img.attached?
        {
          url: rails_blob_url(object.profile_img)
        }
      end
    end

  end
end
