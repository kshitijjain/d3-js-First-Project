
class node_modules_dir {
  # Soft link trick to get over windows' limit of long file names
  file { '/home/vagrant/node_modules':
    ensure => 'directory',
    group  => 'vagrant',
    owner  => 'vagrant',
  }
  file { '/vagrant/node_modules':
      ensure   => 'link',
      target   => '/home/vagrant/node_modules',
      require  => File['/home/vagrant/node_modules'],
  }
}

include node_modules_dir
