<?php
/**
 * Created by PhpStorm.
 * User: cathg
 * Date: 12.05.2020
 * Time: 12:16
 */
require_once '../Core/AutoLoader.php';

$loader = new Core\Autoloader();
$loader->register();
$loader->addNamespace('Core', '../Core');
$loader->addNamespace('Config', '../Config');
$loader->addNamespace('\\', $_SERVER['DOCUMENT_ROOT']);