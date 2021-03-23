class ApplicationController < ActionController::Base
  before_action :require_login
  
  protected
  
  def not_authenticated
    flash[:notice] = t('application.not_authenticated.require_login')
    redirect_to login_path
  end
end
