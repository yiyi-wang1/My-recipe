class Category < ApplicationRecord
    validates :name, presence: true

    has_many :meals, dependent: :nullify
end
