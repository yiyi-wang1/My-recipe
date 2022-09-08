class Comment < ApplicationRecord
  belongs_to :meal
  belongs_to :user

  validates :rating, presence: true, numericality: {only_integer: true, less_than_or_equal_to: 5, greater_than_or_equal_to: 1}
  validates :body, presence: true
  
end
