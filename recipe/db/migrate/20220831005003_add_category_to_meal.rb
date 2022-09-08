class AddCategoryToMeal < ActiveRecord::Migration[7.0]
  def change
    add_reference :meals, :category, null: false, foreign_key: true
  end
end
