class User < ApplicationRecord
    VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i

    has_secure_password
    has_one_attached :profile_img
    
    validates :email, presence: true, uniqueness: true, format: VALID_EMAIL_REGEX, unless: :from_oauth?

    has_many :meals, dependent: :nullify
    has_many :comments, dependent: :nullify

    # orders 
    # has_many :orders, dependent: :nullify

    #favourites
    has_many :favourites, dependent: :destroy
    has_many :favourited_meals, through: :favourites, source: :meal


    def full_name
        self.first_name + " " + self.last_name
    end

    def from_oauth?
        uid.present? && provider.present?
    end

    def self.create_from_oauth(oauth_data)
        name = oauth_data["info"]["name"]&.split || oauth_data["info"]["nickname"]
        self.create(
            first_name: name[0],
            last_name: name[1],
            uid: oauth_data["uid"],
            provider: oauth_data["provider"],
            oauth_raw_data: oauth_data,
            password: SecureRandom.hex(32)
        )
    end


    def self.find_by_oauth(oauth_data)
        self.find_by(
            uid: oauth_data["uid"],
            provider: oauth_data["provider"]
        )
    end

end
