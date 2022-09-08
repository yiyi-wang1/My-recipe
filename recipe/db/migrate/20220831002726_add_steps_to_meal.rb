class AddStepsToMeal < ActiveRecord::Migration[7.0]
  def change
    add_column :meals, :steps, :text, array: true, default: []
  end
end
