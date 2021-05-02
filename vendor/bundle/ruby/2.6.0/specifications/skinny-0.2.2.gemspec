# -*- encoding: utf-8 -*-
# stub: skinny 0.2.2 ruby lib

Gem::Specification.new do |s|
  s.name = "skinny".freeze
  s.version = "0.2.2"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Samuel Cochran".freeze]
  s.date = "2010-11-01"
  s.description = "Simple, upgradable WebSockets for Thin.".freeze
  s.email = "sj26@sj26.com".freeze
  s.extra_rdoc_files = ["README.md".freeze, "LICENSE".freeze]
  s.files = ["LICENSE".freeze, "README.md".freeze]
  s.homepage = "http://github.com/sj26/skinny".freeze
  s.required_ruby_version = Gem::Requirement.new(">= 1.8.7".freeze)
  s.rubygems_version = "3.0.3".freeze
  s.summary = "Thin WebSockets".freeze

  s.installed_by_version = "3.0.3" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 3

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<eventmachine>.freeze, ["~> 1.0"])
      s.add_runtime_dependency(%q<thin>.freeze, [">= 0"])
      s.add_development_dependency(%q<rake>.freeze, [">= 0"])
      s.add_development_dependency(%q<rdoc>.freeze, [">= 0"])
    else
      s.add_dependency(%q<eventmachine>.freeze, ["~> 1.0"])
      s.add_dependency(%q<thin>.freeze, [">= 0"])
      s.add_dependency(%q<rake>.freeze, [">= 0"])
      s.add_dependency(%q<rdoc>.freeze, [">= 0"])
    end
  else
    s.add_dependency(%q<eventmachine>.freeze, ["~> 1.0"])
    s.add_dependency(%q<thin>.freeze, [">= 0"])
    s.add_dependency(%q<rake>.freeze, [">= 0"])
    s.add_dependency(%q<rdoc>.freeze, [">= 0"])
  end
end
