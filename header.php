<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package bohye
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">

    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="site">
    <a class="skip-link screen-reader-text" href="#content"><?php esc_html_e('Skip to content', 'bohye'); ?></a>
    <header id="masthead" class="site-header">
        <div class="nav-container">
            <div class="site-title nav-item"><a href="<?php echo esc_url(home_url('/')); ?>"
                                                rel="home"><?php bloginfo('name'); ?></a></div>
            <nav id="site-navigation" class="main-navigation nav-item">
                <?php
                wp_nav_menu(array(
                    'theme_location' => 'menu-1',
                    'menu_id' => 'primary-menu',
                    'container' => false
                ));
                ?>
            </nav><!-- #site-navigation -->
            <button class="menu-toggle" aria-controls="primary-menu"
                    aria-expanded="false"><?php esc_html_e('Primary Menu', 'bohye'); ?></button>
            <div class="nav-control-container">
                <button class="slide-toggle">V</button>
                <button class="sort-alpha">A</button>
                <button class="sort-chrono">C</button>
            </div>
        </div>
        <div class="mobile-menu-container">
            <?php
            wp_nav_menu(array(
                'theme_location' => 'menu-1',
                'menu_id' => 'primary-menu',
                'container' => false
            ));
            ?>
        </div>
    </header><!-- #masthead -->

    <div id="content" class="site-content">
