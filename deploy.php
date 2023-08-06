<?php

namespace Deployer;

require 'recipe/common.php';

// Config

set('repository', 'git@github.com:kitelabs-dev/byl-docs.git');

add('shared_files', []);
add('shared_dirs', []);
add('writable_dirs', []);

// Hosts

host('167.172.84.236')
  ->set('remote_user', 'root')
  ->set('deploy_path', '/var/www/byl-docs');


// Hooks

task('deploy:build_assets', function () {
  runLocally('npm run docs:build');
  upload('.vitepress/dist', '{{release_path}}/.vitepress');
});

after('deploy:failed', 'deploy:unlock');
before('deploy:symlink', 'deploy:build_assets');
