<?php
/**
 * Plugin Name:       wp-media-center
 * Version:           0.1.0
 * Description:       A modern media library for WordPress.
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 */


$environment = isset($_ENV['WP_MEDIA_CENTER_ENVIRONMENT']) ? $_ENV['WP_MEDIA_CENTER_ENVIRONMENT'] : 'production';
$isDevelopment = $environment === 'development' ? true : false;

function render_manager_page() {
  echo('<div id="wp-media-center__manager-app"></div>');
}

function add_manager_scripts() {
  global $isDevelopment;
  $url = $isDevelopment ? 'http://localhost:8081/manager.js' : plugin_dir_url(__FILE__).'static/manager.js';
  wp_enqueue_script('wp-media-center', $url, array(), null, true); 
}

function add_manager_menu() {
  $managerHookSuffix = add_menu_page('Media Center', 'Media Center', 'manage_options', 'media-center', 'render_manager_page', 'dashicons-admin-media', 10);
  add_action('admin_print_scripts-'.$managerHookSuffix, 'add_manager_scripts');
}

add_action('admin_menu', 'add_manager_menu');
