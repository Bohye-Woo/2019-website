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
    <header class="alt-layout">
        <div class="col-2">
            <table>
                <tbody>
                <tr>
                    <td class="title"><?php the_title(); ?> <div class="year"><?php the_field('year'); ?></div>
                        <div class="hidden">
                            <div><?php the_field('format'); ?></div>
                            <div><?php the_field('client'); ?></div>
                            <div><?php the_field('location'); ?></div>
                        </div>
                    </td>
                    <td class="format"><?php the_field('format'); ?></td>
                    <td class="client"><?php the_field('client'); ?></td>
                    <td class="location"><?php the_field('location'); ?></td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="post-description col-1"><?php the_content(); ?></div>
    </header>

    <div class="post-gallery">
        <?php
        $id_it = 1;
        $nextExists = get_field('image_' . $id_it);
        while ($nextExists){
            ?>

            <div class="grid-item">
                <img src="<?php the_field('image_' . $id_it) ?>">
                <div class="grid-item-desc">
                    <div class="grid-item-desc-text"><?php the_title(); ?></div>
                </div>
            </div>

            <?php
            $id_it++;
            $nextExists = get_field('image_' . $id_it);
        }
        ?>
    </div>

	<div class="entry-content">
		<?php
		wp_link_pages( array(
			'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'bohye' ),
			'after'  => '</div>',
		) );
		?>
	</div><!-- .entry-content -->

	<footer class="entry-footer">
		<?php bohye_entry_footer(); ?>
	</footer><!-- .entry-footer -->
</article><!-- #post-<?php the_ID(); ?> -->
