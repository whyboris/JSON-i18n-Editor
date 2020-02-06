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

/**
 * Check if user has permission to edit this particular language
 *
 * Checked on login and on save
 */
function validatePermission($username, $language) {

  global $permissions;

  $userPermissions = $permissions[strtolower($username)];

  if ($userPermissions[0] == 'all' || in_array($language, $userPermissions)) {
    return true;
  } else {
    return false;
  }

}

?>
