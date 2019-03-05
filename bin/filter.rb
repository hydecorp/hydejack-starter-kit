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

