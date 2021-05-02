# -*- encoding: utf-8 -*-
# stub: mailcatcher 0.2.4 ruby lib

Gem::Specification.new do |s|
  s.name = "mailcatcher".freeze
  s.version = "0.2.4"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Samuel Cochran".freeze]
  s.date = "2011-05-10"
  s.description = "      MailCatcher runs a super simple SMTP server which catches any\n      message sent to it to display in a web interface. Run\n      mailcatcher, set your favourite app to deliver to\n      smtp://127.0.0.1:1025 instead of your default SMTP server,\n      then check out http://127.0.0.1:1080 to see the mail.\n".freeze
  s.email = "sj26@sj26.com".freeze
  s.executables = ["mailcatcher".freeze]
  s.extra_rdoc_files = ["LICENSE".freeze, "README.md".freeze]
  s.files = ["LICENSE".freeze, "README.md".freeze, "bin/mailcatcher".freeze]
  s.homepage = "http://github.com/sj26/mailcatcher".freeze
  s.rubygems_version = "3.0.3".freeze
  s.summary = "Runs an SMTP server, catches and displays email in a web interface.".freeze

  s.installed_by_version = "3.0.3" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 3

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<eventmachine>.freeze, [">= 0"])
      s.add_runtime_dependency(%q<mail>.freeze, [">= 0"])
      s.add_runtime_dependency(%q<i18n>.freeze, [">= 0"])
      s.add_runtime_dependency(%q<sqlite3-ruby>.freeze, [">= 0"])
      s.add_runtime_dependency(%q<thin>.freeze, [">= 0"])
      s.add_runtime_dependency(%q<skinny>.freeze, [">= 0.1.2"])
      s.add_runtime_dependency(%q<sinatra>.freeze, [">= 0"])
      s.add_runtime_dependency(%q<haml>.freeze, [">= 0"])
      s.add_runtime_dependency(%q<json>.freeze, [">= 0"])
    else
      s.add_dependency(%q<eventmachine>.freeze, [">= 0"])
      s.add_dependency(%q<mail>.freeze, [">= 0"])
      s.add_dependency(%q<i18n>.freeze, [">= 0"])
      s.add_dependency(%q<sqlite3-ruby>.freeze, [">= 0"])
      s.add_dependency(%q<thin>.freeze, [">= 0"])
      s.add_dependency(%q<skinny>.freeze, [">= 0.1.2"])
      s.add_dependency(%q<sinatra>.freeze, [">= 0"])
      s.add_dependency(%q<haml>.freeze, [">= 0"])
      s.add_dependency(%q<json>.freeze, [">= 0"])
    end
  else
    s.add_dependency(%q<eventmachine>.freeze, [">= 0"])
    s.add_dependency(%q<mail>.freeze, [">= 0"])
    s.add_dependency(%q<i18n>.freeze, [">= 0"])
    s.add_dependency(%q<sqlite3-ruby>.freeze, [">= 0"])
    s.add_dependency(%q<thin>.freeze, [">= 0"])
    s.add_dependency(%q<skinny>.freeze, [">= 0.1.2"])
    s.add_dependency(%q<sinatra>.freeze, [">= 0"])
    s.add_dependency(%q<haml>.freeze, [">= 0"])
    s.add_dependency(%q<json>.freeze, [">= 0"])
  end
end
