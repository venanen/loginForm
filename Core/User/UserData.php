<?php
/**
 * Created by PhpStorm.
 * User: cathg
 * Date: 13.05.2020
 * Time: 15:42
 */

namespace Core\User;


class UserData extends MainClass
{

    protected $mysqli, $token;

    public function __construct(object $mysqli)
    {
        $this->mysqli = $mysqli;

    }

    public function isAuthUser(string $token='') : bool
    {
        if ($token == '')
            return false;
        $prepare = $this->mysqli->prepare("SELECT * FROM `users` WHERE `token` = ?");
        if (!$prepare->bind_param('s', $token)) {
            $this->makeCustomError("errorOnFetch");
            return false;
        }
        if (!$prepare->execute()) {
            $this->makeCustomError("errorOnFetch");
            return false;
        }
        $result = $prepare->get_result();

        return (bool)$result->num_rows;

    }

    public function getUserData(string $token='') : string
    {
        if($token == '' || !$this->isAuthUser($token)){
            $this->makeCustomError("sessionExpired");
            return $this->buildAnswer();
        }
        $prepare = $this->mysqli->prepare("SELECT * FROM `users` WHERE `token` = ?");
        if (!$prepare->bind_param('s', $token)) {
            $this->makeCustomError("errorOnFetch");
            return $this->buildAnswer();
        }
        if (!$prepare->execute()) {
            $this->makeCustomError("errorOnFetch");
            return $this->buildAnswer();
        }
        $result = $prepare->get_result()->fetch_assoc();
        $this->addAdditionData(["userData"=>$result]);
        return $this->buildAnswer();

    }
}