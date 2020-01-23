<?php

include 'validate.php';
include 'logger.php';
include 'languages.php';

$user = $_SERVER['HTTP_USER'];
$pass = $_SERVER['HTTP_PASS'];
$language = $_SERVER['HTTP_LANGUAGE'];

if (validateUser($user, $pass)) {

  if (in_array($language, $allowed_languages)) {
    // echo 'language exists!';

    save_latest($user, $language);

  } else {
    echo 'error 2';
  }

} else {
  echo 'error 1';
}

function save_latest($username, $lang) {

  $jsonString = file_get_contents('php://input');

  $myFile = $lang . '/' . $lang . time() . ".json";

  file_put_contents($myFile, $jsonString);

  update_log($username, $lang . " - updated");

  echo '{ "success": true }';

}

?>
