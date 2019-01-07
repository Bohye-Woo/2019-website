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
        if (win.width() <= 840) {
            $(".post header").removeClass("alt-layout");
            $(".post header").addClass("orig-layout");
        }
        $(window).on('resize', function(){
            if (win.width() <= 840) {
                $(".post header").removeClass("alt-layout");
                $(".post header").addClass("orig-layout");
            } else {
                $(".post header").removeClass("orig-layout");
                $(".post header").addClass("alt-layout");
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