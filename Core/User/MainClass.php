<?php
/**
 * Created by PhpStorm.
 * User: cathg
 * Date: 08.05.2020
 * Time: 22:14
 */

namespace Core\User;
class MainClass
{
    protected  $error = ["isError" => false, "customError" => "", "fields" => [], "additionData" => []];

    /**
     * Устанавливает ошибку полей формы с описанием
     * @param $field
     * @param $error
     */
    protected function makeFieldError($field, $error) : void
    {
        $this->error['isError'] = true;
        $this->error['fields'][$field] = $error;
    }

    /**
     * Усатанавливает общую ошибку, не привязанную к полю формы
     * @param $error
     */
    protected function makeCustomError($error) : void
    {
        $this->error['isError'] = true;
        $this->error['customError'] = $error;
    }

    /**
     * Возвращает false, если ошибок не найденo, true если найдены
     * @return bool
     */
    protected function hasError() : bool
    {
        return $this->error['isError'];
    }

    /**
     * Устанавливает дополнительную информацию для кленитской части, например auth_token
     * @param $data
     */
    protected function addAdditionData(array $data) : void
    {
        $this->error['isError'] = false;
        $this->error['additionData'] = $data;
    }

    public function secureString(string $string) :string
    {
        return htmlspecialchars($string);
    }

    /**
     * Возвращает хеш пароля
     * @param $password
     * @return string
     */
    public function passwordHash(string $password) :string
    {
        return password_hash($password, PASSWORD_DEFAULT);
        //var_dump( $password." ".md5($password));
        //return md5($password);
    }

    /**
     * Проверяет пароль на соответсвие переданному хешу
     * @param $password
     * @param $hash
     * @return bool
     */
    public function passwordVerify(string $password, string $hash) :bool
    {
        return password_verify($password, $hash);

    }

    /**
     * Возвращает закодированный массив состояния.
     *
     * @param string $add - для отладочоной информации, для выявляения в каком месте сработывает ответ
     * @return string
     */
    protected function buildAnswer($add = '')
    {
        return json_encode($this->error) . $add;
    }


}