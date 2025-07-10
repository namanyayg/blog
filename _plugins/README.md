# Jekyll Cache Busting Plugin

This plugin adds cache busting functionality to Jekyll assets (CSS and JavaScript files).

## How it works

The plugin adds a `cache_bust` Liquid filter that appends a version parameter to asset URLs based on the file's last modified time. This ensures that browsers will download fresh copies of assets when they change, rather than using cached versions.

## Usage

Apply the filter to asset URLs in your templates:

```liquid
<link rel="stylesheet" href="{{ "/assets/main.css" | cache_bust | relative_url }}">
<script src="{{ "/assets/main.js" | cache_bust | relative_url }}"></script>
```

The filter will transform these URLs to include a version parameter:

```html
<link rel="stylesheet" href="/assets/main.css?v=1647123456">
<script src="/assets/main.js?v=1647123789"></script>
```

## Notes

- The filter only applies to files with `.css` or `.js` extensions
- The version parameter is based on the file's last modified time
- If the file doesn't exist, the current time is used instead 