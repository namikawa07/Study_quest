class ContactsController < ApplicationController
  def create
    @contact = Contact.new(contact_params)
    if @contact.save
      ContactMailer.contact_mail(@contact).deliver
      flash[:success] = t('contacts.create.Success')
      redirect_to root_path
    else
      flash.now[:danger] = t('contacts.create.Not_success')
      render 'home/index'
    end
  end

  private

  def contact_params
    params.require(:contact).permit(:name, :email, :content)
  end
end
