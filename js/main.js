jQuery(document).ready(function ($) {
    let animationCompleted = true;
    let $container = $('#nav-grid');
    let $grid = $container.isotope({
        itemSelector: '.grid-item',
        layoutMode: 'masonry',
        masonry: {
            rowHeight: 100,
            gutter: 10
        },
        sortBy: 'random'
    });

    if ($(".post .post-gallery").length) {
        $(document).ready(function() {
            $('.post .post-gallery').css('margin-top', $('.post header').outerHeight());
        });
    }

    $grid.imagesLoaded().progress(function () {
        $grid.isotope('layout');
    });

    let $galleryContainer = $('.post-gallery');
    let $postGallery = $galleryContainer.isotope({
        itemSelector: '.grid-item',
        layoutMode: 'masonry',
        masonry: {
            rowHeight: 100,
            gutter: 12
        },
        sortBy: 'random'
    });

    $postGallery.imagesLoaded().progress(function () {
        $postGallery.isotope('layout');
    });

    //Add the class selected to the item that is clicked, and remove from the others
    let $optionSets = $('#filters'),
        $optionLinks = $optionSets.find('a');

    $optionLinks.click(function () {
        let $this = $(this);

        if ($this.hasClass('selected')) {
            return false;
        }
        let $optionSet = $this.parents('#filters');
        $optionSets.find('.selected').removeClass('selected');
        $this.addClass('selected');

        //When an item is clicked, sort the items.
        let selector = $(this).attr('data-filter');
        $container.isotope({filter: selector});

        return false;
    });

    if ($(".post .alt-layout").length){
        let win = $(this);
        let header = $(".post header");
        if (win.width() <= 840) {
            header.removeClass("alt-layout");
            header.addClass("orig-layout");
        }
        $(window).on('resize', function(){
            $('.post .post-gallery').css('margin-top', header.outerHeight());
            if (win.width() <= 840) {
                header.removeClass("alt-layout");
                header.addClass("orig-layout");
            } else {
                header.removeClass("orig-layout");
                header.addClass("alt-layout");
            }
        });
    }

    $(".slide-toggle").click(function () {
        if (animationCompleted) {
            animationCompleted = false;
            let $table_slide = $(".table-slide");
            let $grid_slide = $(".grid-slide");

            if ($table_slide.hasClass("hidden")) {
                $table_slide.removeClass("hidden");
                $table_slide.animate({marginTop: '56px'}, 600, function () {
                    $grid_slide.addClass("hidden");
                    animationCompleted = true;
                });
            } else {
                $grid_slide.removeClass("hidden");
                $table_slide.animate({marginTop: '-100vh'}, 600, function () {
                    $table_slide.addClass("hidden");
                    animationCompleted = true;
                });
            }
        }
    });
});