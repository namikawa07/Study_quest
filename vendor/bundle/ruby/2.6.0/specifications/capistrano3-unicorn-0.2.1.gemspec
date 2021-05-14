# -*- encoding: utf-8 -*-
# stub: capistrano3-unicorn 0.2.1 ruby lib

Gem::Specification.new do |s|
  s.name = "capistrano3-unicorn".freeze
  s.version = "0.2.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Matthew Lineen".freeze]
  s.date = "2014-07-16"
  s.description = "Unicorn specific Capistrano tasks".freeze
  s.email = ["matthew@lineen.com".freeze]
  s.homepage = "https://github.com/tablexi/capistrano3-unicorn".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.0.3".freeze
  s.summary = "Unicorn specific Capistrano tasks".freeze

  s.installed_by_version = "3.0.3" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<capistrano>.freeze, ["~> 3.1", ">= 3.1.0"])
    else
      s.add_dependency(%q<capistrano>.freeze, ["~> 3.1", ">= 3.1.0"])
    end
  else
    s.add_dependency(%q<capistrano>.freeze, ["~> 3.1", ">= 3.1.0"])
  end
end
