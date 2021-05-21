class UserMailer < ApplicationMailer
  def reset_password_email(user)
    @user = User.find user.id
    @url = edit_password_reset_url(@user.reset_password_token)
    mail(to: user.email, subject: 'パスワード再設定用メール') do |format|
      format.html #HTMLメールを指定
    end
  end
end
