function place_in_bin(rgb, number_of_bins) {
    // given a color and the number of bins
    // return which bin it should fit in (brightest is lowst)

    let bright = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
    return Math.floor(map(bright, 0, 255, 0, number_of_bins));
}

function do_text(x, y, params) {
    palate = params.palate;

    fill('black');
    textFont('Helvetica ');
    textSize(20);

    let bin = place_in_bin(r, g, b);
    let letter = palate[bin];

    text(letter, x, y);
}

function do_thing_for_each_pixel_of_image(
    img,
    fn = do_text,
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
                let x_loc = img.width - PIXEL_W - x;
            }

            fn(x_loc, y, params);

            x = x + pixel_w - 1;
        }
        y = y + pixel_h - 1;
    }
}
