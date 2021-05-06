class PasswordResetsController < ApplicationController
  skip_before_action :require_login

  def create
    @user = User.find_by_email(params[:email])
    if @user
      @user.deliver_reset_password_instructions!
      redirect_to login_path
      flash[:success] = t('password_resets.create.Success')
    else
      render root_path
      flash.now[:danger] = t('password_resets.create.Not_success')
    end
  end

  def edit
    set_token_user_from_params?
  end

  def update
    return unless set_token_user_from_params?

    @user.password_confirmation = params[:user][:password_confirmation]
    if @user.change_password(params[:user][:password])
      redirect_to login_path
      flash[:success] = t('password_resets.update.Success')
    else
      render edit_password_reset_path(@user)
      flash.now[:danger] = t('password_resets.update.Not_success')
    end
  end

  private

  def set_token_user_from_params?
    @token = params[:id]
    @user = User.load_from_reset_password_token(params[:id])

    if @user.blank?
      not_authenticated
      return false
    else
      return true
    end
  end
end
