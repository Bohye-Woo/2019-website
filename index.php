<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package bohye
 */

get_header();
?>
    <div id="primary" class="content-area">
        <main id="main" class="site-main">
            <?php
            if (have_posts()) :

                if (is_home() && !is_front_page()) :
                    ?>
                    <header>
                        <h1 class="page-title screen-reader-text"><?php single_post_title(); ?></h1>
                    </header>
                <?php
                endif;
                ?>
                <div class="slide table-slide hidden">
                    <div class="nav-table-container">
                        <?php $the_query = new WP_Query('posts_per_page=50'); ?>
                        <?php if ($the_query->have_posts()) : ?>
                            <table class="nav-table" id="nav-table">
                                <tbody>
                                <?php while ($the_query->have_posts()) : $the_query->the_post();
                                    $termsArray = get_the_terms($post->ID, "category");
                                    $termsString = "";
                                    foreach ($termsArray as $term) {
                                        $termsString .= $term->slug . ' ';
                                    }
                                    ?>
                                    <tr data-href="<?php the_permalink(); ?>">
                                        <td class="year"><?php the_field('year'); ?></td>
                                        <td class="title"><?php the_title(); ?></td>
                                        <td class="format"><?php the_field('format'); ?></td>
                                        <td class="client"><?php the_field('client'); ?></td>
                                        <td class="location"><?php the_field('location'); ?></td>
                                    </tr>
                                <?php endwhile; ?>
                                </tbody>
                            </table>
                        <?php endif; ?>
                    </div>
                </div>
                <div class="slide grid-slide">
                    <?php $the_query = new WP_Query('posts_per_page=50'); ?>
                    <?php if ($the_query->have_posts()) : ?>
                        <div id="nav-grid">
                            <?php while ($the_query->have_posts()) : $the_query->the_post();
                                $termsArray = get_the_terms($post->ID, "category");
                                $termsString = "";
                                foreach ($termsArray as $term) {
                                    $termsString .= $term->slug . ' ';
                                }
                                ?>
                                <a href="<?php the_permalink(); ?>">
                                    <div class="<?php echo $termsString; ?> grid-item">
                                        <?php if (has_post_thumbnail()) {
                                            the_post_thumbnail();
                                        } ?>
                                        <div style="background-color: <?php the_field('feature_color'); ?>" class="grid-item-desc">
                                            <div class="grid-item-desc-text"><?php the_title(); ?></div>
                                            <div class="grid-item-year"><?php the_field('year'); ?></div>
                                        </div>
                                    </div>
                                </a>
                            <?php endwhile; ?>
                        </div>
                    <?php endif; ?>
                </div>
            <?php

            else :
                get_template_part('template-parts/content', 'none');
            endif;
            ?>

        </main><!-- #main -->
    </div><!-- #primary -->

<?php
get_footer();
