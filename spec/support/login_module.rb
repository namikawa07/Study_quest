module LoginModule
  def login(user)
    visit login_path
    fill_in 'Email', with: user.email
    fill_in 'Password', with: 'test_password'
    click_button 'LOGIN'
  end
end
