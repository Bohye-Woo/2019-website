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

    if ($("body").hasClass("single-post")) {
        postSetup();
    }

    if ($(".about-section").length) {
        aboutSetup();
    }

    function aboutSetup() {
        $(".site-content").addClass("about-content");
        initMap();

        function initMap() {
            let styles = [
                {
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#f5f5f5"
                        }
                    ]
                },
                {
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#616161"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#f5f5f5"
                        }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#bdbdbd"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#eeeeee"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#e5e5e5"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#9e9e9e"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#dadada"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#616161"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#9e9e9e"
                        }
                    ]
                },
                {
                    "featureType": "transit.line",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#e5e5e5"
                        }
                    ]
                },
                {
                    "featureType": "transit.station",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#eeeeee"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#c9c9c9"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#9e9e9e"
                        }
                    ]
                }
            ];
            let studio = {lat: 51.921383, lng: 4.504079};
            let map = new google.maps.Map(document.getElementById('map'), {zoom: 16, center: studio, styles: styles});
            let marker = new google.maps.Marker({position: studio, map: map});
        }
    }

    function postSetup() {
        let win = $(this);
        let header = $(".post header");

        $('.post .post-gallery').css('margin-top', header.outerHeight());

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

        if ($(".post .alt-layout").length) {
            if (win.width() <= 840) {
                header.removeClass("alt-layout");
                header.addClass("orig-layout");
            }
            $(window).on('resize', function () {
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
    }
});