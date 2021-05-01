require 'rails_helper'

RSpec.describe "PasswordChanges", type: :request do
  describe "GET /new" do
    it "returns http success" do
      get "/password_changes/new"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /create" do
    it "returns http success" do
      get "/password_changes/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /edit" do
    it "returns http success" do
      get "/password_changes/edit"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /update" do
    it "returns http success" do
      get "/password_changes/update"
      expect(response).to have_http_status(:success)
    end
  end

end
