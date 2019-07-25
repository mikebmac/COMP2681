<?php
// Deny Direct Access - https://stackoverflow.com/questions/33999475/prevent-direct-url-access-to-php-file
if ( $_SERVER['REQUEST_METHOD']=='GET' && realpath(__FILE__) == realpath( $_SERVER['SCRIPT_FILENAME'] ) ) {
  header( 'HTTP/1.0 403 Forbidden', TRUE, 403 );

  die( header( 'location: ../index.html' ) );

}

if(isset($_POST['submit'])){
  $to = "michael.mackay@plrd.ab.ca";
  $from = $_POST['email'];
  $name = $_POST['name'];
  $subject = "New Email from PLRD Battlebots";
  $message = "This was sent via the PLRD Battlebots contact form (http://battlebots.themrmackay.com/contact.html) from " . $name . ":\n\n" . $_POST['message'];

  $headers = "From:" . $from;
  mail($to,$subject,$message,$headers);
}

header( 'location: ../contact.html' )
?>