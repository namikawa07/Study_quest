class HomeController < ApplicationController
  skip_before_action :require_login

  def index
    @contact = Contact.new
  end
end
