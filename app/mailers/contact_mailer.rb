class ContactMailer < ApplicationMailer
  def contact_mail(contact)
    @contact = contact
    mail to: 'namikawait@gmail.com', subject: 'confirmation'
  end
end
