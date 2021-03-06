<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package bohye
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <header class="<?php the_field('description_layout'); ?>">
        <div class="description-table">
            <table>
                <tbody>
                <tr>
                    <td class="title"><?php the_title(); ?>
                        <div class="year">(<?php the_field('year'); ?>)</div>
                    </td>
                    <td class="format"><?php the_field('format'); ?></td>
                    <td class="client"><?php the_field('client'); ?></td>
                    <td class="location"><?php the_field('location'); ?></td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="post-description"><?php the_content(); ?></div>
    </header>

    <div class="post-gallery-container">
        <div class="post-gallery">
            <?php
            $id_it = 1;
            $nextExists = get_field('image_' . $id_it);
            while ($nextExists) {
                ?>
                <div class="grid-item">
                    <img src="<?php the_field('image_' . $id_it) ?>">
                </div>
                <?php
                $id_it++;
                $nextExists = get_field('image_' . $id_it);
            }
            ?>
        </div>
    </div>
    <footer class="entry-footer">
        <?php
        wp_link_pages(array(
            'before' => '<div class="page-links">' . esc_html__('Pages:', 'bohye'),
            'after' => '</div>',
        ));
        ?>
        <?php bohye_entry_footer(); ?>
    </footer><!-- .entry-footer -->
</article><!-- #post-<?php the_ID(); ?> -->
