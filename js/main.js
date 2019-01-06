jQuery(document).ready(function ($) {
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

    //Add the class selected to the item that is clicked, and remove from the others
    let $optionSets = $('#filters'),
        $optionLinks = $optionSets.find('a');

    $optionLinks.click(function () {
        let $this = $(this);
        // don't proceed if already selected
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

    $(".table-toggle").click(function () {
        let table_slide = $(".table-slide");
        let grid_slide = $(".grid-slide");

        if (table_slide.hasClass("hidden")) {
            table_slide.removeClass("hidden");
            table_slide.animate({marginTop: '56px'}, 600, function () {
                grid_slide.addClass("hidden");
            });
        } else {
            grid_slide.removeClass("hidden");
            table_slide.animate({marginTop: '-100vh'}, 600, function () {
                table_slide.addClass("hidden");
            });
        }
    });
});