<?php
header("Access-Control-Allow-Origin: *");
error_reporting(E_ERROR|E_WARNING);
include 'Core/AutoLoader.php';
use Core\User\Register as Register;
use Core\User\Login as Login;
use Config\Database as Database;
use Core\User\UserData as UserData;
use Core\AutoLoader;
$loader = new Autoloader();
$loader->register();
$loader->addNamespace('Core', $_SERVER['DOCUMENT_ROOT'].'/Core');
$loader->addNamespace('Config', $_SERVER['DOCUMENT_ROOT'].'/Config');


$register = new Register(Database::getMysqliInstance());
$login = new Login(Database::getMysqliInstance());
$userData = new UserData(Database::getMysqliInstance());



switch($_GET['action']){
    case 'signup':
        echo $register->signUp($_POST['login'], $_POST['password'], $_POST['repeatPassword'], $_POST['name'], $_POST['mail'], $_POST['phone'],$_FILES);
    break;

    case 'signin':
        echo $login->signIn($_POST['login'], $_POST['password']);

    break;
    case 'getuserdata':
        echo $userData->getUserData($_POST['token']);
    break;
    default:
        echo 'Not Allowed';

    break;


}




//
//print_r($_GET);
//print_r($_POST);
//print_r($_FILES);
