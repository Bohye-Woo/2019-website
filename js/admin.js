jQuery(document).ready(function ($) {
    if (wp.media) {
        wp.media.view.Modal.prototype.on('close', function () {
            setTimeout(function () { // Give the image some time to load
                let colorInput = $('#feature-color-picker input');
                let featuredImageUrl = $('.editor-post-featured-image img').attr('src');

                Vibrant.from(featuredImageUrl).getPalette(function (err, swatches) {
                    if (err) throw err;
                    let color = swatches['Vibrant'].getHex();
                    colorInput.css('background-color', color);
                    colorInput.css('color', 'white');
                    colorInput.val(color);
                });
            }, 3000);
        });
    }
});