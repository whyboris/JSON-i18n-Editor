<?php

function update_log($username, $message) {

  $txt = $username . "\t" . time() . "\t" . $message;
  $myfile = file_put_contents('logs.txt', $txt.PHP_EOL , FILE_APPEND | LOCK_EX);

}

?>
