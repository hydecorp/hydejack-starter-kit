#!/usr/bin/env ruby

begin
  require 'nokogiri'
rescue LoadError
  puts "Run 'gem install nokogiri'"
  exit 1
end

def split_header(data)
  header, body = nil, nil
  if data =~ /\A\s*---/
    _, header, *rest = data.split('---')
    body = rest.join('---')
  else
    body = data
  end

  [header, body]
end

def process(data)
  header, body = split_header(data)

  doc = Nokogiri::HTML::DocumentFragment.parse(body)

  # Add 'highlight' class to tables because it bypasses our template's default formatting.
  doc.css("table").each do |node|
    node['class'] = (node['class'] || '') + ' highlight' unless (node['class'] || '') =~ /highlight/
  end

  # Set colors.
  doc.css("[style]").each do |node|
    node['style'] = node['style'].gsub(/#\w{6}/) { |m|
      case m
      when '#ffffff','#fafafa'
        'var(--body-bg)'
      when '#5f5f5f'
        'var(--gray-text)'
      when '#202020'
        'var(--body-color)'
      when '#2f767f'
        'var(--mc-link-color)'
      else
        m
      end
    }
  end

  # Remove any header, footer, and old subscribe regions.
  doc.css('#templateFooter, #subscribe-footer').each do |node|
    node.remove
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
