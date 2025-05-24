#!/bin/bash

# Script to generate thumbnails using ImageMagick

# Configuration
SOURCE_DIR="images/gallery"
THUMBS_DIR="images/gallery/thumbs"
THUMB_WIDTH="150" # Desired width of the thumbnails in pixels
# THUMB_HEIGHT="100" # Optional: if you want fixed height, uncomment and adjust convert command
IMAGE_QUALITY="85" # For JPEGs

# Create the thumbnails directory if it doesn't exist
mkdir -p "$THUMBS_DIR"

echo "Starting thumbnail generation..."

# Find images (jpg, jpeg, png) in the source directory
# -maxdepth 1 ensures we only look in the immediate SOURCE_DIR, not subdirectories within it (except thumbs)
find "$SOURCE_DIR" -maxdepth 1 \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -print0 | while IFS= read -r -d $'\0' image_path; do
    # Get the filename from the full path
    filename=$(basename "$image_path")

    # Construct the output path for the thumbnail
    thumb_path="$THUMBS_DIR/$filename"

    echo "Processing: $filename -> $thumb_path"

    # Generate the thumbnail
    # -resize "${THUMB_WIDTH}x" : Resizes to width, height is auto-adjusted to maintain aspect ratio
    # -resize "${THUMB_WIDTH}x${THUMB_HEIGHT}^" -gravity center -extent "${THUMB_WIDTH}x${THUMB_HEIGHT}" : For fixed size, crop to fit
    # -strip : Removes metadata (like EXIF data) to reduce file size
    # -quality $IMAGE_QUALITY : Sets JPEG quality
    # +profile "*" : Removes all color profiles to further reduce size (use with caution if color accuracy is paramount)
    # -sharpen 0x.5 : Optional: apply a slight sharpen

    convert "$image_path" \
            -resize "${THUMB_WIDTH}x" \
            -strip \
            -quality "$IMAGE_QUALITY" \
            -sharpen 0x.5 \
            "$thumb_path"

    # If you want fixed dimensions (e.g., 150x100) and are okay with cropping:
    # convert "$image_path" \
    #         -resize "${THUMB_WIDTH}x${THUMB_HEIGHT}^" \
    #         -gravity center \
    #         -extent "${THUMB_WIDTH}x${THUMB_HEIGHT}" \
    #         -strip \
    #         -quality "$IMAGE_QUALITY" \
    #         -sharpen 0x.5 \
    #         "$thumb_path"

    if [ $? -eq 0 ]; then
        echo "Successfully created thumbnail: $thumb_path"
    else
        echo "ERROR: Failed to create thumbnail for $filename"
    fi
done

echo "Thumbnail generation complete."
echo "Thumbnails are in: $THUMBS_DIR"