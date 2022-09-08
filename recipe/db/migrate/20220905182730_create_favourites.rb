class CreateFavourites < ActiveRecord::Migration[7.0]
  def change
    create_table :favourites do |t|
      t.references :user, null: false, foreign_key: true, index: true
      t.references :meal, null: false, foreign_key: true, index: true

      t.timestamps
    end
  end
end
