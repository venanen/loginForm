<?php
/**
 * Created by PhpStorm.
 * User: cathg
 * Date: 08.05.2020
 * Time: 22:38
 */

namespace Core\User;

use Core\Validator as Validator;


class Register extends MainClass
{
    /**
     * @var string - Путь для загрузки аватара
     */
    private $uploadDir;

    /**
     * @var object Объект $mysqli
     */
    protected $mysqli;

    public function __construct($mysqli)
    {
        $this->uploadDir = $_SERVER['DOCUMENT_ROOT'] . "/avatars/";
        $this->mysqli = $mysqli;
    }

    /**
     * Функция регистрации. Возвращает закодированный в JSON объект состояния
     * @param string $login
     * @param string $password
     * @param string $repass
     * @param string $name
     * @param string $mail
     * @param string $phone
     * @param mixed $file
     * @return string
     */
    public function signUp(string $login, string $password, string $repass, string $name, string $mail, string $phone, $file): string
    {


        if (!$this->validation($login, $password, $repass, $name, $mail, $phone, $file)) { //валидация формы
            return $this->buildAnswer();
        }


        if ($this->isLoginUsed($login)) { //проверка, занят ли такой логин
            $this->makeFieldError('login', 'loginIsUsed');
            return $this->buildAnswer();
        }

        $password = $this->passwordHash($password);

        $file = $this->processFile($file, $login); //проверка загрузки файла
        if ($file === false) {
            $this->makeCustomError('errorOnFetch');
            return $this->buildAnswer();
        }


        $token = $this->generateAuthToken($login, $password);

        $prepared = $this->mysqli->prepare('INSERT INTO `users` (`login`, `password`, `name`, `mail`, `phone`,  `token`, `avatar`) VALUES (?, ?, ?, ?, ?, ?, ?)');
        if (!$prepared) {
            $this->makeCustomError('errorOnFetch');
            return $this->buildAnswer();
        }


        $prepared->bind_param("sssssss",
            htmlspecialchars($login),
            $password,
            htmlspecialchars($name),
            htmlspecialchars($mail),
            htmlspecialchars($phone),
            $token,
            $file
        );


        if (!$prepared->execute()) {

            $this->makeCustomError('errorOnFetch');
            return $this->buildAnswer();

        } else {
            $this->addAdditionData(['token' => $token]);
            return $this->buildAnswer();
        }


    }

    public function validation(string $login, string $password, string $repass, string $name, string $mail, string $phone, $file): bool
    {
        if (Validator::isEmpty($login)) {
            $this->makeFieldError('login', 'loginIsEmpty');
        }
        if (Validator::isEmpty($password)) {
            $this->makeFieldError('password', 'passwordIsEmpty');
        }
        if (Validator::isEmpty($repass)) {
            $this->makeFieldError('repeatPassword', 'repeatPasswordIsEmpty');
        }
        if (Validator::isEmpty($name)) {
            $this->makeFieldError('name', 'nameIsEmpty');
        }
        if (Validator::isEmpty($mail)) {
            $this->makeFieldError('mail', 'mailIsEmpty');
        }
        if (Validator::isEmpty($phone)) {
            $this->makeFieldError('phone', 'phoneIsEmpty');
        }
        if (!Validator::isValidMail($mail)) {
            $this->makeFieldError('mail', 'mailIsInvalid');
        }
        if (!Validator::isValidPhone($phone)) {
            $this->makeFieldError('phone', "phoneIsInvalid");
        }
        if (!Validator::isAlphaNumCyrillic($name)) {
            $this->makeFieldError('name', "nameIsInvalid");
        }
        if (!Validator::isAlphaNum($login)) {
            $this->makeFieldError('login', "loginIsInvalid");
        }
        if ($password != $repass) {
            $this->makeFieldError('password', "passRepassIsInvalid");
            $this->makeFieldError('repeatPassword', "passRepassIsInvalid");
        }

        if (isset($file) && is_array($file) && $file !== '' && !Validator::isValidFile($file['file'])) {
            $this->makeCustomError('fileIsInvalid');
        }

        return !$this->hasError();


    }


    public function processFile($file, string $login)
    {

        if (!isset($file['file'])) {
            return '';
        }
        $fileName = $this->uploadDir . $login . "_" . time() . "_" . basename($file['file']['name']);


        if (move_uploaded_file($file['file']['tmp_name'], $fileName)) {
            return $login . "_" . time() . "_" . basename($file['file']['name']);
        } else {
            return false;
        }


    }

    private function isLoginUsed(string $login): bool
    {
        $prepare = $this->mysqli->prepare('SELECT * FROM `users` WHERE `login` = ?');
        $prepare->bind_param('s', $login);

        if (!$prepare->execute()) {
            $this->makeCustomError('errorOnFetch');
            die($this->buildAnswer());
        }
        $prepare->store_result();

        return (bool)$prepare->num_rows;
    }

    private function generateAuthToken(string $login, string $password): string
    {
        return md5($login . time() . $password);
    }


}