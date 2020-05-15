<?php

namespace Core\User;

use Core\Validator as Validator;

/**
 * Created by PhpStorm.
 * User: cathg
 * Date: 08.05.2020
 * Time: 22:28
 */
class Login extends MainClass
{
    protected $mysqli;

    /**
     * Login constructor.
     * Установка экземпляра работы с базой данных
     * @param $mysqli
     */
    public function __construct($mysqli)
    {
        $this->mysqli = $mysqli;
    }

    /** Функция авторизации. Возвращает закодировканный в json массив глобального состояния mainClass->$error
     * @param string $login
     * @param string $password
     * @return string - JSON объет состояния
     *
     */
    public function signIn(string $login, string $password): string
    {
        if (!$this->validation($login, $password))
            return $this->buildAnswer();

        $prepare = $this->mysqli->prepare('SELECT * FROM `users` WHERE `login` = ?');
        $prepare->bind_param('s', $login);
        if (!$prepare->execute()) {
            $this->makeCustomError('errorOnFetch');
            return $this->buildAnswer();
        }
        $result = $prepare->get_result();
        if ($result->num_rows === 0) {
            $this->makeCustomError('incorrectLoginOrPassword');
            return $this->buildAnswer();
        }
        $result = $result->fetch_assoc();


        if ($this->passwordVerify($password, $result['password'])) {
            $this->addAdditionData(["token" => $result['token']]);
            return $this->buildAnswer();
        } else {
            $this->makeCustomError('incorrectLoginOrPassword');
            return $this->buildAnswer();
        }

    }

    /** Осуществляет валидацию полей. Возвращает true, если все хорошо, false если ошибка
     * Устанавливает поля ошибок в объект состояния mainClass->$error
     * @param string $login
     * @param string $password
     * @return bool
     */
    public function validation(string $login, string $password): bool
    {
        $error = false;
        if (Validator::isEmpty($login)) {
            $this->makeFieldError('login', 'loginIsEmpty');
            $error = true;
        }
        if (Validator::isEmpty($password)) {
            $this->makeFieldError('password', 'passwordIsEmpty');
            $error = true;
        }


        return !$error;
    }

}