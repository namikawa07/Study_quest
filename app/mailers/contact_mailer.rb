class ContactMailer < ApplicationMailer
  def contact_mail(contact)
    @contact = contact
    mail to: 'namikawait@gmail.com', from: 'namikawa.tatsuki@gmail.com', subject: 'お問い合わせ'
  end
end
