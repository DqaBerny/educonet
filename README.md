Educonet — Local setup notes

This project is a static site. A small housekeeping step is recommended to avoid URL-encoded image paths: rename the `HTML\6 images` folder and its files to kebab-case so HTML references use `6-images/...`.

Why
- Filenames with spaces are often URL-encoded (`6%20images`), fragile, and harder to reference.
- Kebab-case (lowercase with hyphens) is predictable and consistent.

Safe steps to run locally (PowerShell)

# 1) Preview planned renames (dry-run)
Get-ChildItem -Path "HTML\6 images" | Select-Object Name, @{Name='NewName';Expression={ ($_.Name -replace ' ','-' ).ToLower() }}

# 2) Create the new folder and move files (safer approach)
New-Item -ItemType Directory -Path "HTML\6-images"
Get-ChildItem -Path "HTML\6 images" | ForEach-Object {
  $new = ($_.Name -replace ' ', '-').ToLower()
  Copy-Item -Path $_.FullName -Destination (Join-Path -Path "HTML\6-images" -ChildPath $new)
}

# 3) When you're happy with copied files, remove the old folder
# Remove-Item -Path "HTML\6 images" -Recurse

# 4) OR, if you prefer renaming in-place (one-shot—be careful)
Rename-Item -Path "HTML\6 images" -NewName "6-images"
Get-ChildItem -Path "HTML\6-images" | ForEach-Object {
  $new = ($_.Name -replace ' ', '-').ToLower()
  Rename-Item -Path $_.FullName -NewName $new
}

Notes
- I updated the HTML files to reference `6-images/...` for the homepage slider and courses list. You only need to run these local commands to make the image filenames match the HTML.
- After running the rename/copy steps, open `HTML\Educonet.html` and `HTML\Courses.html` in your browser to verify the slider and course thumbnails load correctly.

If you'd like, I can also create a tiny `serve.bat` or `serve.ps1` that opens the homepage in your default browser after renames. Let me know if you want that.
