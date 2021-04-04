class HomeController < ApplicationController
  skip_before_action :require_login
  skip_before_action :my_mission
  def index;end
end
