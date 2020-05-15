<?php
/**
 * Created by PhpStorm.
 * User: cathg
 * Date: 13.05.2020
 * Time: 2:20
 */

namespace Test;

use Core\User\MainClass;
use PHPUnit\Framework\TestCase;

class MainClassTest extends TestCase
{
    protected $fixture;
    protected function setUp() : void
    {
        $this->fixture = new MainClass();
    }

    public function testPasswordVerify()
    {
        $password = 'testPassword!123~';
        $this->assertEquals($this->fixture->passwordVerify($password, $this->fixture->passwordHash($password)), true );
        $this->assertEquals($this->fixture->passwordVerify($password, md5($password)), false );
    }
    protected function tearDown(): void
    {
        $this->fixture = NULL;
    }

}
