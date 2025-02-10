<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit04843bd693b1d8a5a811fc7265ceb190
{
    public static $prefixLengthsPsr4 = array (
        'S' => 
        array (
            'SwagTestShipsVendorDirectory\\' => 29,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'SwagTestShipsVendorDirectory\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit04843bd693b1d8a5a811fc7265ceb190::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit04843bd693b1d8a5a811fc7265ceb190::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit04843bd693b1d8a5a811fc7265ceb190::$classMap;

        }, null, ClassLoader::class);
    }
}
