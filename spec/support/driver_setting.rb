RSpec.configure do |config|
  config.before(:each, type: :system) do
    #デバック時の確認の際、下を有効にする
    # driven_by(:selenium_chrome)
    driven_by(:selenium_chrome_headless)
  end
end
