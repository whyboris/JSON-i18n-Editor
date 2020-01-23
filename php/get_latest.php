<?php

include 'validate.php';
include 'languages.php';

$user = $_SERVER['HTTP_USER'];
$pass = $_SERVER['HTTP_PASS'];
$language = $_SERVER['HTTP_LANGUAGE'];

if (validateUser($user, $pass)) {
  // echo 'secret: success';

  if (in_array($language, $allowed_languages)) {
    // echo 'language exists!';

    serve_latest($language);

  } else {
    echo 'error 2';
  }

} else {
  echo 'error 1';
}

function serve_latest($lang) {

  $filesList = scandir($lang . '/');

  $latest = end($filesList);

  $strJson = file_get_contents($lang . '/' . $latest);

  echo $strJson;

}

?>
