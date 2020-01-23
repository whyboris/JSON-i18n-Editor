<?php

include 'validate.php';

$user = $_SERVER['HTTP_USER'];
$pass = $_SERVER['HTTP_PASS'];

if (validateUser($user, $pass)) {

    echo  '{ "success": true }';

} else {

  echo '{ "success": false, "error": 2 }';

}

?>
