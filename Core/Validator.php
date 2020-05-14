<?php
/**
 * Created by PhpStorm.
 * User: cathg
 * Date: 09.05.2020
 * Time: 19:23
 */

namespace Core;


class Validator
{

    protected static $allowedFile = ['image/png', 'image/jpeg', 'image/gif'];

    public static function isEmpty($value)
    {
        return (trim($value) === "");
    }

    public static function isValidMail($mail)
    {
        return (bool) filter_var($mail, FILTER_VALIDATE_EMAIL);
    }

    public static function isValidPhone($phone)
    {
        $cleanPhone = trim(str_replace(array(' ', '+', '-', '(', ')'), '', $phone));
        return (bool) preg_match("/^[0-9]{10,13}+$/", $cleanPhone);
    }

    public static function isAlphaNum($value)
    {
        return (bool) preg_match("/^[A-Za-z0-9_]{1,}+$/", $value);
    }

    public static function isAlphaNumCyrillic($value)
    {
        return  (preg_match("/^[А-Яа-яA-Za-z0-9_]{1,}+$/", $value) === 1);
    }

    public static function isValidFile($file)
    {
       return isset($file) && $file!=='' && is_array($file) && in_array($file['type'], self::$allowedFile);
    }


}