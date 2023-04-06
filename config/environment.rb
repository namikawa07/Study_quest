# Load the Rails application.
require_relative 'application'

# Initialize the Rails application.
Rails.application.initialize!
config.assets.compile = true
config.assets.initialize_on_precompile=false
