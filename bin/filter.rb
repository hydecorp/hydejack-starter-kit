#!/usr/bin/env ruby
require 'nokogiri'

def process(data)
  header, body = nil, nil
  if data =~ /\A\s*---/
    _, header, *rest = data.split('---')
    body = rest.join('---')
  else
    body = data
  end

  doc = Nokogiri::HTML::DocumentFragment.parse(body)
  doc.css("table").each do |node|
    node['class'] = (node['class'] || '') + ' highlight' unless (node['class'] || '') =~ /highlight/
  end

  doc.css("[style]").each do |node|
    node['style'] = node['style'].gsub(/#\w{6}/) { |m|
      case m
      when '#ffffff','#fafafa'
        'var(--body-bg)'
      when '#5f5f5f'
        'var(--gray-text)'
      when '#202020'
        'var(--body-color)'
      else
        m
      end
    }
  end

  if header
    '---' + header + '---' + doc.to_html
  else
    doc.to_html
  end
end

files = Dir['archive/_posts/*.html']
files.each do |file|
  puts "Processing #{file}"
  processed = process(File.read(file))
  File.open(file, 'w') do |file|
    file.print processed
  end
end
