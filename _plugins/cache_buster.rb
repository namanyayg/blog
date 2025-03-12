module Jekyll
  module CacheBuster
    def cache_bust(url)
      if url.end_with?('.css', '.js')
        # Get the file path from the URL
        file_path = File.join(site.source, url.sub(/^\//, ''))
        
        if File.exist?(file_path)
          # Use file's last modified time as cache buster
          mtime = File.mtime(file_path).to_i
          "#{url}?v=#{mtime}"
        else
          # If file doesn't exist, use current time
          "#{url}?v=#{Time.now.to_i}"
        end
      else
        url
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::CacheBuster) 