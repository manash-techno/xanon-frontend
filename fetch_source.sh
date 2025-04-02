#!/bin/bash

# Directories to scan
dirs=(
    "src/components/ui/ReactDatePicker"
)

# Ignore these directories
ignore_dirs=(

)

# Ignore these files
ignore_files=(

)

# Explicitly include these files even if they are outside the specified directories
include_files=(

)

# Output file path
output_file="./source_code_tree.txt"

# Ensure output directory exists
mkdir -p "$(dirname "$output_file")"

# Clear the output file before writing new content
true > "$output_file"

# File extensions to write only path for
media_extensions=("jpg" "jpeg" "png" "gif" "bmp" "svg" "mp4" "mkv" "avi" "mov" "mp3" "wav" "ogg" "flac" "webm")

# Function to check if a file or directory should be ignored
should_ignore() {
  local target="$1"
  for ignore in "${ignore_dirs[@]}"; do
    if [[ "$target" == "$ignore"* ]]; then
      return 0 # Ignore
    fi
  done
  for ignore in "${ignore_files[@]}"; do
    if [[ "$target" == "$ignore" ]]; then
      return 0 # Ignore
    fi
  done
  return 1 # Don't ignore
}

# Function to check if the file is a media file
is_media_file() {
  local file="$1"
  local ext="${file##*.}"
  for media_ext in "${media_extensions[@]}"; do
    if [[ "$ext" == "$media_ext" ]]; then
      return 0 # Media file
    fi
  done
  return 1 # Not a media file
}

# Process files from the specified directories
for dir in "${dirs[@]}"; do
  while IFS= read -r -d '' file; do
    if should_ignore "$file"; then
      continue
    fi
    if is_media_file "$file"; then
      echo -e "\n$file\n---- [MEDIA FILE] ----\n" >> "$output_file"
    else
      echo -e "\n$file\n----\n" >> "$output_file"
      cat "$file" >> "$output_file"
      echo -e "\n\n" >> "$output_file"
    fi
  done < <(find "$dir" -type f -print0)
done

# Process explicitly included files
for file in "${include_files[@]}"; do
  if [[ -f "$file" && ! $(should_ignore "$file") ]]; then
    if is_media_file "$file"; then
      echo -e "\n$file\n---- [MEDIA FILE] ----\n" >> "$output_file"
    else
      echo -e "\n$file\n----\n" >> "$output_file"
      cat "$file" >> "$output_file"
      echo -e "\n\n" >> "$output_file"
    fi
  fi
done

echo "✅ File written successfully to: $output_file"
