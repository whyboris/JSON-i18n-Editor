<?php

include 'validate.php';

$user = $_SERVER['HTTP_USER'];
$pass = $_SERVER['HTTP_PASS'];
$language = $_SERVER['HTTP_LANGUAGE'];

if (validateUser($user, $pass) && validatePermission($user, $language)) {

    echo  '{ "success": true }';

} else {

  echo '{ "success": false, "error": 2 }';

}

?>
