<?php
/**
 * Created by PhpStorm.
 * User: cathg
 * Date: 08.05.2020
 * Time: 21:53
 */
namespace Config;
use Config\Constants as Constants;
class Database{

    public function __construct()
    {
        return $this->getMysqliInstance();
    }

    public static function getMysqliInstance(){
        $mysqli = new \mysqli(Constants::$MYSQLI_HOST, Constants::$MYSQLI_USER, Constants::$MYSQLI_PASSWORD, Constants::$MYSQLI_DB);
        if ($mysqli->connect_errno) {
            die(Constants::$MYSQLI_HOST."Не удалось подключиться к MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error);
        }
        $mysqli->set_charset("utf8");
        return $mysqli;
    }
}
