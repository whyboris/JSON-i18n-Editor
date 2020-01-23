<?php

// TEMP -- allow cors while DEV
include 'cors.php';

include 'passwords.php';

function validateUser($username, $password) {

  global $allowed;

  if (array_key_exists(strtolower($username), $allowed)) {
    if ($password == $allowed[strtolower($username)]) {
      return true;
    } else {
      header("HTTP/1.1 401 Unauthorized");
      exit;
    }

  } else {
    header("HTTP/1.1 401 Unauthorized");
    exit;
  }

}

?>
