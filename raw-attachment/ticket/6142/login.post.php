<?php
/*
**	@desc:		PHP ajax login form using jQuery
**	@author:	programmer@chazzuka.com
**	@url:		http://www.chazzuka.com/blog
**	@date:		15 August 2008
**	@license:	Free!, but i'll be glad if i my name listed in the credits'
*/

// @ error reporting setting  (  modify as needed )
ini_set("display_errors", 1);
error_reporting (E_ALL ^ E_NOTICE);

//@ explicity start session just if not automatically started at php.ini
session_start();

//@ validate inclusion
define('VALID_ACL_', true);

//@ load dependency files
require('login.config.php');
require('login.lang.php');
require('login.class.php');

//@ new acl instance
$acl = new Authorization;

//@check session status
$status = $acl->check_status();

if ($status) {
    // @ session already active
    echo "{'status':true, 'message':'<div class=\"welcome\">Welcome, <b>".$_SESSION['exp_user']['username']."!</div> &nbsp;<div class=\"logout\"><img src=\"http://images.acelogisticsllc.com/layout/user-48.png\" alt=\"Ace Logistics\" class=\"avatar\"/> <a href=\"php/index.php?logoff=1\">Logout</a></b>&nbsp;|&nbsp;<b><a id=\"changeP\" href=\"#change\">Change password</a></b></div>'}";
} else {
    //@ session not active
    if ($_SERVER['REQUEST_METHOD']=='GET') {
        //@ first load
        echo "{'status':false,'message':'".$acl->form()."'}";
    } else {
        //@ form submission
        $u = (!empty($_POST['u']))?trim($_POST['u']):false;
        // retrive user var
        $p = (!empty($_POST['p']))?trim($_POST['p']):false;
        // retrive password var
        
        // @ try to signin
        $is_auth = $acl->signin($u,$p);
        $acl->loginTime();
		
        if ($is_auth) {
            //@ success           
		    echo "{'status':true, 'message':'Welcome, <b>".$_SESSION['exp_user']['username']."!</b>', 'url':'".SUCCESS_URL."'}";
        } else {
            //@ failed            
			echo "{'status': false,'message':'<span class=\"warning\"> <b>*Your ".((LOGIN_METHOD=='user'||LOGIN_METHOD=='both')?'username':'')."  or password was entered incorrectly.</b></span>'}";
        }
    }
}

//@ destroy instance
unset($acl);