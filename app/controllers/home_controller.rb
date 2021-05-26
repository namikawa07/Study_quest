class HomeController < ApplicationController
  skip_before_action :require_login
  skip_before_action :test_login_limit

  def index
    @contact = Contact.new
  end
end
