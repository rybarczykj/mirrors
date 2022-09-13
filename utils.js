function place_in_bin_according_to_brightness(rgb, number_of_bins) {
    // given a color and the number of bins
    // return which bin it should fit in (brightest is lowest)

    let bright = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
    return Math.floor(map(bright, 0, 255, 0, number_of_bins));
}

function do_thing_for_each_pixel_of_image(
    img,
    fn,
    pixel_w = 1,
    pixel_h = 1,
    mirror = false,
    params = null,
) {
    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
            index = (y * width + x) * 4;
            let rgb = img.pixels.slice(index, index + 3);

            // mirror if needed
            let x_loc = x;
            if (mirror == true) {
                x_loc = img.width - PIXEL_W - x;
            }

            fn(x_loc, y, rgb, params);

            x = x + pixel_w - 1;
        }
        y = y + pixel_h - 1;
    }
}
