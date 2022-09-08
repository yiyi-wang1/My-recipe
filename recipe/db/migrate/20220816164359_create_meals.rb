class CreateMeals < ActiveRecord::Migration[7.0]
  def change
    create_table :meals do |t|
      t.string :title
      t.text :description
      t.text :video_url
      t.integer :time
      t.text :ingredients

      t.timestamps
    end
  end
end
