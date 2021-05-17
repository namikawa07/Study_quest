RSpec.configure do |config|
  config.before(:each, type: :system, js: true) do
    if ENV["SELENIUM_DRIVER_URL"].present?
      driven_by :selenium, using: :chrome, options: {
        browser: :remote,
        url: ENV.fetch("SELENIUM_DRIVER_URL"),
        desired_capabilities: :chrome
      }
    else
      #デバック時の確認の際、下を有効にする
      # driven_by(:selenium_chrome)
      driven_by(:selenium_chrome_headless)
    end
  end
end
