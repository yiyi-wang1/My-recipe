class Ability
  include CanCan::Ability

  def initialize(user)
      user ||= User.new # guest user (not logged in)
    #   if user.admin?
    #     can :manage, :all
    #   else
    #     can :read, :all
    #   end
    #
    alias_action :create, :read, :update, :delete, to: :crud

    can :crud, Meal do |meal|
      user == meal.user
    end

    can :crud, Comment do |comment|
      user == comment.user
    end

    can :destroy, Favourite do |favourite|
      favourite.user == user
    end

    can :crud, User do |u|
      u == user
    end
    
  end
end
