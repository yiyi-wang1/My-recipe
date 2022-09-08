class AddVerifiedToMeal < ActiveRecord::Migration[7.0]
  def change
    add_column :meals, :verified, :boolean, default: false
  end
end
