class Meal < ApplicationRecord
    include Elasticsearch::Model
    include Elasticsearch::Model::Callbacks

    mapping dynamic: false do
        indexes :title
        indexes :description
        indexes :ingredients
    end

    belongs_to :category
    belongs_to :user

    validates :title, presence: true
    validates :description, presence: true
    validates :time, presence: true, numericality: {only_integer: true, greater_than_or_equal_to: 0}
    validates :ingredients, presence: true
    validates :steps, presence: true


    has_many :comments, dependent: :destroy
    has_many_attached :images

    has_many :favourites, dependent: :destroy
    has_many :likers, through: :favourites, source: :user

    def category_name
        self.category(:name)
    end

    def category_name=(rhs)
        self.category = Category.find_or_initialize_by(name: rhs)
    end

    def self.search(query)
      params = {
        query: {
          bool: {
            should: [
              { match: { title: { query: query, boost: 5, fuzziness: "AUTO" } }},
              { match: { description: query }},
              { match: { ingredients:  { query: query, boost: 5, fuzziness: "AUTO"} }}
            ],
          }
        }
      }
      self.__elasticsearch__.search(params)
    end
end
