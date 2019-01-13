jQuery(document).ready(function ($) {
    $(window).load(function () {
        let win = $(this);
        let body = $("body");
        let gridFadeInSpeed = 800;

        if (body.hasClass("home")) {
            frontSetup();
        } else if (body.hasClass("single-post")) {
            postSetup();
        } else if ($(".about-section").length) {
            aboutSetup();
        }

        function hideMobileMenu($scrollContainer) {
            let didScroll;
            let lastScrollTop = 0;
            let delta = 5;
            let navbarHeight = $('.mobile-menu-container').outerHeight();

            $scrollContainer.scroll(function (event) {
                didScroll = true;
            });

            setInterval(function () {
                if (didScroll) {
                    hasScrolled();
                    didScroll = false;
                }
            }, 250);

            function hasScrolled() {
                let st = $scrollContainer.scrollTop();
                if (Math.abs(lastScrollTop - st) <= delta)
                    return;

                if (st > lastScrollTop && st > navbarHeight) {
                    $('.mobile-menu-container').addClass('move-up');
                } else {
                    $('.mobile-menu-container').removeClass('move-up');
                }
                lastScrollTop = st;
            }
        }

        function frontSetup() {
            let animationCompleted = true;
            let $container = $('#nav-grid');
            $container.hide();
            $container.imagesLoaded(function () {
                $container.fadeIn(gridFadeInSpeed).isotope({
                    itemSelector: '.grid-item',
                    layoutMode: 'masonry',
                    masonry: {
                        rowHeight: 100,
                        gutter: 10
                    },
                    getSortData: {
                        title: '.grid-item-desc-text',
                        year: '.grid-item-year parseInt'
                    },
                    sortBy: 'year'
                });
            });

            let $optionSets = $('#filters'),
                $optionLinks = $optionSets.find('a');

            $optionLinks.click(function () {
                let $this = $(this);

                if ($this.hasClass('selected')) {
                    return false;
                }
                $optionSets.find('.selected').removeClass('selected');
                $this.addClass('selected');

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
                        $table_slide.animate({marginTop: '0'}, 600, function () {
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

            $(".nav-table tr").click(function () {
                window.location = $(this).data("href");
            });

            $(window).on('resize', function () {
                let $gridSlide = $('.grid-slide');
                if (win.width() <= 600) {
                    hideMobileMenu($gridSlide);
                } else {
                    $gridSlide.unbind('scroll');
                }
            });
            $(window).trigger("resize");

            $(".sort-alpha").click(function () {
                $container.isotope({sortBy: 'title'});
                navSort(".title");
            });

            $(".sort-chrono").click(function () {
                navSort(".year");
                $container.isotope({sortBy: 'year'});
            });

            function navSort(columnClass) {
                let column = $(columnClass);
                var table = column.parents('table').eq(0);
                var rows = table.find('tr').toArray().sort(comparer(column.index()));
                this.asc = !column.asc;
                if (!this.asc) {
                    rows = rows.reverse()
                }
                for (var i = 0; i < rows.length; i++) {
                    table.append(rows[i])
                }
            }

            function comparer(index) {
                return function (a, b) {
                    var valA = getCellValue(a, index), valB = getCellValue(b, index);
                    return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
                }
            }

            function getCellValue(row, index) {
                return $(row).children('td').eq(index).text()
            }
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
                let map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 15,
                    center: studio,
                    styles: styles
                });
                let marker = new google.maps.Marker({position: studio, map: map});
            }

            $(window).on('resize', function () {
                if (win.width() <= 600) {
                    hideMobileMenu($(this));
                } else {
                    $(this).unbind('scroll');
                }
            });
            $(window).trigger("resize");
        }

        function postSetup() {
            let header = $(".post header");
            let postGallery = $('.post .post-gallery-container');
            let altLayout = $('.post header').hasClass('alt-layout');

            let $galleryContainer = $('.post-gallery');
            $galleryContainer.imagesLoaded(function () {
                $galleryContainer.fadeIn(gridFadeInSpeed).isotope({
                    itemSelector: '.grid-item',
                    layoutMode: 'masonry',
                    masonry: {
                        rowHeight: 100,
                        gutter: 12
                    }
                });
            });

            if ($(".post .alt-layout").length && win.width() <= 840) {
                header.removeClass("alt-layout");
                header.addClass("orig-layout");
            }

            $(window).on('resize', function () {
                if (win.width() <= 600) {
                    hideMobileMenu($(this));
                } else {
                    $(this).unbind('scroll');
                }
                if (win.width() > 760) {
                    postGallery.css('margin-top', header.outerHeight());
                } else {
                    postGallery.css('margin-top', '');
                }
                if (altLayout) {
                    if (win.width() <= 840) {
                        header.removeClass("alt-layout");
                        header.addClass("orig-layout");
                    } else {
                        header.removeClass("orig-layout");
                        header.addClass("alt-layout");
                    }
                }
            });
            $(window).trigger("resize");
        }
    });
});
