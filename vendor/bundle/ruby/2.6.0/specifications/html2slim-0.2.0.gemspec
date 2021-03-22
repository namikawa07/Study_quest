# -*- encoding: utf-8 -*-
# stub: html2slim 0.2.0 ruby lib

Gem::Specification.new do |s|
  s.name = "html2slim".freeze
  s.version = "0.2.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Maiz Lulkin".freeze]
  s.date = "2015-03-21"
  s.description = "Convert HTML to Slim templates. Because HTML sux and Slim rules. That's why.".freeze
  s.email = ["maiz@lulk.in".freeze]
  s.executables = ["erb2slim".freeze, "html2slim".freeze]
  s.extra_rdoc_files = ["README.md".freeze]
  s.files = ["README.md".freeze, "bin/erb2slim".freeze, "bin/html2slim".freeze]
  s.homepage = "https://github.com/slim-template/html2slim".freeze
  s.rdoc_options = ["--charset=UTF-8".freeze]
  s.rubygems_version = "3.0.3".freeze
  s.summary = "HTML to Slim converter.".freeze

  s.installed_by_version = "3.0.3" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<hpricot>.freeze, [">= 0"])
      s.add_development_dependency(%q<minitest>.freeze, [">= 0"])
      s.add_development_dependency(%q<rake>.freeze, [">= 0"])
      s.add_development_dependency(%q<slim>.freeze, [">= 1.0.0"])
    else
      s.add_dependency(%q<hpricot>.freeze, [">= 0"])
      s.add_dependency(%q<minitest>.freeze, [">= 0"])
      s.add_dependency(%q<rake>.freeze, [">= 0"])
      s.add_dependency(%q<slim>.freeze, [">= 1.0.0"])
    end
  else
    s.add_dependency(%q<hpricot>.freeze, [">= 0"])
    s.add_dependency(%q<minitest>.freeze, [">= 0"])
    s.add_dependency(%q<rake>.freeze, [">= 0"])
    s.add_dependency(%q<slim>.freeze, [">= 1.0.0"])
  end
end
