<?php
/**
 * Created by PhpStorm.
 * User: cathg
 * Date: 13.05.2020
 * Time: 0:42
 */

namespace Test;

use Core\User\Login;
use PHPUnit\Framework\TestCase;
use Config\Database;

class LoginTest extends TestCase
{
    protected $fixtutre;

    protected function setUp(): void
    {
        $this->fixtutre = new Login(Database::getMysqliInstance());
    }

    public function testValidation()
    {
        $this->assertEquals($this->fixtutre->validation('', ''), false);
        $this->assertEquals($this->fixtutre->validation('1', ''), false);
        $this->assertEquals($this->fixtutre->validation('', '1'), false);
        $this->assertEquals($this->fixtutre->validation('test', 'test'), true);
    }
}
