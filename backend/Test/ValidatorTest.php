<?php
/**
 * Created by PhpStorm.
 * User: cathg
 * Date: 12.05.2020
 * Time: 0:57
 */

include '../Core/Validator.php';

use PHPUnit\Framework\TestCase;

class ValidatorTest extends TestCase
{


    public function testIsEmpty()
    {
        $this->assertEquals(Core\Validator::isEmpty(''), true);
        $this->assertEquals(Core\Validator::isEmpty('123'), false);
    }

    public function testIsValidMail()
    {
        $this->assertEquals(Core\Validator::isValidMail(''), false);
        $this->assertEquals(Core\Validator::isValidMail('213'), false);
        $this->assertEquals(Core\Validator::isValidMail('mollojb@bk.ru'), true);

    }

    public function testIsValidPhone()
    {
        $this->assertEquals(Core\Validator::isValidPhone('89175869584'), true);
        $this->assertEquals(Core\Validator::isValidPhone('8435345934534985344'), false);
    }

    public function testIsAlphaNum()
    {
        $this->assertEquals(Core\Validator::isAlphaNum('wefhwjgbwkejfhbjkwefnbkwjebnf124235324234'), true);
        $this->assertEquals(Core\Validator::isAlphaNum('wefhwjgbwkej////===fhbjkwefnbkwjebnf124235324234'), false);
    }
    public function testIsAlphaNumCyrillic(){
        $this->assertEquals(Core\Validator::isAlphaNumCyrillic('wefhwjgbwkejfhbjkwefnbkwjebnf124235324234'), true);
        $this->assertEquals(Core\Validator::isAlphaNumCyrillic('wenf12423534а'), true);
        $this->assertEquals(Core\Validator::isAlphaNumCyrillic('wefhwjgbwkej////===fhbjkwefnbkwjebnf124235324234'), false);
    }

    public function testIsValidFile(){
        $this->assertEquals(Core\Validator::isValidFile(''), false);
        $this->assertEquals(Core\Validator::isValidFile(['type'=>'json/stetham']), false);
        $this->assertEquals(Core\Validator::isValidFile(['type'=>'image/png']), true);

    }



}
