<?php
/**
 * Created by PhpStorm.
 * User: cathg
 * Date: 13.05.2020
 * Time: 2:26
 */

namespace Test;

use Config\Database;
use Core\User\Register;
use PHPUnit\Framework\TestCase;

class RegisterTest extends TestCase
{
    protected $fixture;

    protected function setUp() : void
    {
        $this->fixture = new Register(Database::getMysqliInstance());
    }

    /**
     * @dataProvider validationDataProvider
     */
    public function testValidation($login, $password, $repass, $name, $mail, $phone, $file, $expected)
    {
        $this->assertEquals($this->fixture->validation($login, $password, $repass, $name, $mail, $phone, $file), $expected);
    }

    public function validationDataProvider()
    {
        $validFile = ["file"=>["type"=>"image/png", "tmp_name"=>"dont/worry/be/happy.tmp", "error"=>0]];
        $invalidFile = ["file"=>["type"=>"plain/text", "tmp_name"=>"dont/worry/be/happy.tmp", "error"=>2]];
        return [
            ['', '', '', '', '', '', '', false],
            ['login', '', '', '', '', '', '', false],
            ['login', 'pass', '', '', '', '', '', false],
            ['login', 'pass', 'pass1', '', '', '', '', false],
            ['login', 'pass', 'pass1', '___killer___pro///1!', '', '', '', false],
            ['login', 'pass', 'pass', '___killer___pro', 'kewlfl@ldr', '897746853', '', false],
            ['login', 'pass', 'pass', '___killer___pro', 'kewlfl@ldr.ru', '89774685301', '', true],
            ['login', 'pass', 'pass', 'killerpro', 'kewlfl@ldr.ru', '89774685301', $validFile, true],
            ['login', 'pass', 'pass', '___killer___pro', 'kewlfl@ldr.ru', '89774685301', $invalidFile, false]

        ];
    }

}
