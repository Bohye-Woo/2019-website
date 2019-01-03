jQuery(document).ready(function($) {
    let $container = $('#nav-grid'); //The ID for the list with all the blog posts
    let $grid = $container.isotope({ //Isotope options, 'item' matches the class in the PHP
        itemSelector : '.grid-item',
        layoutMode : 'masonry',
        masonry: {
            rowHeight: 100,
            gutter: 10
        },
        sortBy : 'random'
    });

    $grid.imagesLoaded().progress( function() {
        $grid.isotope('layout');
    });

    //Add the class selected to the item that is clicked, and remove from the others
    let $optionSets = $('#filters'),
        $optionLinks = $optionSets.find('a');

    $optionLinks.click(function(){
        let $this = $(this);
        // don't proceed if already selected
        if ( $this.hasClass('selected') ) {
            return false;
        }
        let $optionSet = $this.parents('#filters');
        $optionSets.find('.selected').removeClass('selected');
        $this.addClass('selected');

        //When an item is clicked, sort the items.
        let selector = $(this).attr('data-filter');
        $container.isotope({ filter: selector });

        return false;
    });
});