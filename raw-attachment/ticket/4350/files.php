<?PHP 
// THIS PHP CODE IS MY CONTACTUS FORM 
$SMTP    = new SMTP($Info->option['smtp_host'], $Info->option['smtp_username'], $Info->option['smtp_password']); 

$Contact    = new Contact; 

class Contact 
{ 
    var $data        = array(); 

    function Contact(){ 
        global $Func; 

        $act    = $Func->get_vars('act', 1); 

        switch ($act){ 
            case "send": 
                $this->do_send_email(); 
                break; 
            default: 
                $this->pre_send_email(); 
        } 
    } 
    function pre_send_email($msg = ""){ 
        global $Info, $Template, $Lang, $Func, $HomeGlobal; 

        $Info->tpl_main    = "mailto"; 
        $Func->make_image_number(); 

        $Template->set_vars(array( 
            'ERROR_MSG'                => $msg, 
            'S_CONTACT_ACTION'        => $Func->compile_url(array('mod' => 'mailto', 'act' => 'send')), 
            'BROWSER_NAVIGATOR'        => ' - '. $Lang->data['general_contact'], 
            "L_CONTACT_US"            => $Lang->data["contact"], 
            "L_NAME"                => $Lang->data["contact_name"], 
            "L_EMAIL"                => $Lang->data["contact_email"], 
            "L_ADDRESS"                => $Lang->data["contact_address"], 
            "L_TEL"                    => $Lang->data["contact_tel"], 
            "L_SUBJECT"                => $Lang->data["contact_subject"], 
            "L_MESSAGE"                => $Lang->data["contact_message"], 
            "L_BUTTON_SEND"            => $Lang->data["contact_button_send"], 
            "L_ERROR_NOT_FULL"        => $Lang->data["general_error_not_full"], 
            "L_ERROR_EMAIL"            => $Lang->data["general_error_email"], 
            'VISITOR_NAME'            => isset($this->data['name']) ? stripslashes($this->data['name']) : '', 
            'VISITOR_EMAIL'            => isset($this->data['email']) ? stripslashes($this->data['email']) : '', 
            'VISITOR_ADDRESS'        => isset($this->data['address']) ? stripslashes($this->data['address']) : '', 
            'VISITOR_TEL'            => isset($this->data['tel']) ? stripslashes($this->data['tel']) : '', 
            'SUBJECT'                => isset($this->data['subject']) ? stripslashes($this->data['subject']) : '', 
            'MESSAGE'                => isset($this->data['message']) ? stripslashes($this->data['message']) : '', 
        )); 
    } 
function check_ip(){ 
        global $Info, $Template, $Lang, $DB, $Func; 

        $DB->query("SELECT client_ip FROM ". $DB->prefix ."contact_ip WHERE client_ip='". $Info->client_ip ."' AND contact_time>=". (CURRENT_TIME - $Info->option['time_recontact'])); 
        if ( $DB->num_rows() ){ 
            $Template->page_transfer($Lang->data['contact_error_flood'], $Func->compile_url(array('mod' => 'mailto'))); 
            return false; 
        } 

        return true; 
    } 
function do_send_email(){ 
        global $Func, $DB, $Template, $Lang, $Info, $SMTP; 

        $this->data['name']            = isset($_POST["visitor_name"]) ? htmlspecialchars($_POST["visitor_name"]) : ''; 
        $this->data['email']        = isset($_POST["visitor_email"]) ? htmlspecialchars($_POST["visitor_email"]) : ''; 
        $this->data['address']        = isset($_POST["visitor_address"]) ? htmlspecialchars($_POST["visitor_address"]) : ''; 
        $this->data['tel']            = isset($_POST["visitor_tel"]) ? htmlspecialchars($_POST["visitor_tel"]) : ''; 
        $this->data['subject']        = isset($_POST["subject"]) ? htmlspecialchars($_POST["subject"]) : ''; 
        $this->data['message']        = isset($_POST["message"]) ? htmlspecialchars($_POST["message"]) : ''; 
        $number_id            = isset($_POST["number_id"]) ? htmlspecialchars($_POST["number_id"]) : ''; 
        $number_value        = isset($_POST["number_value"]) ? intval($_POST["number_value"]) : 0; 

        if ( empty($this->data['name']) || empty($this->data['email']) || empty($this->data['subject']) || empty($this->data['message']) ){ 
            $this->pre_send_email($Lang->data["general_error_not_full"]); 
            return false; 
        } 

        if ( !$Func->check_email($this->data['email']) ){ 
            $this->pre_send_email($Lang->data["general_error_email"]); 
            return false; 
        } 

        $this->check_ip(); 
if ( empty($number_id) || !$number_value ){ 
            $this->pre_send_email($Lang->data['general_error_login_number']); 
            return false; 
        } 

        $DB->query("SELECT * FROM ". $DB->prefix ."number WHERE num_id='". $number_id ."'"); 
        if ( !$DB->num_rows() ){ 
            $this->pre_send_email($Lang->data["general_error_login_number"]); 
            return false; 
        } 
        $number_info    = $DB->fetch_array(); 
        if ( $number_value != $number_info['num_value'] ){ 
            $this->pre_send_email($Lang->data["general_error_login_number"]); 
            return false; 
        } 
$DB->query("DELETE FROM ". $DB->prefix ."number WHERE num_id='". $number_id ."'"); 

$content    = $Lang->data['contact_name'] .": ". stripslashes($this->data['name']) ."\n"; 
        $content    .= $Lang->data['contact_email'] .": ". stripslashes($this->data['email']) ."\n"; 
        $content    .= $Lang->data['contact_address'] .": ". stripslashes($this->data['address']) ."\n"; 
        $content    .= $Lang->data['contact_tel'] .": ". stripslashes($this->data['tel']) ."\n"; 
        $content    .= $Lang->data['contact_message'] .": \n\n". stripslashes($this->data['message']); 
        $content    = nl2br($content); 
//SMTP ------------------------------- 
        $SMTP->message_charset($Lang->charset); 
        $SMTP->message_subject('['. $Info->option['site_name'] .'] - '. $this->data['subject']); 
        $SMTP->message_content($content); 
        $SMTP->email_from($this->data['email']); 

        //Admin emails 
        $Info->option['admin_email']    = str_replace(',', ';', $Info->option['admin_email']); 
        $admin_emails    = explode(';', $Info->option['admin_email']); 
        $i    = 0; 
        reset($admin_emails); 
        while (list(, $admin_email) = each($admin_emails)){ 
            $admin_email    = trim($admin_email); 
            if ( !empty($admin_email) ){ 
                if ( $i == 0 ){ 
                    $SMTP->email_to($admin_email); 
                } 
                else{ 
                    $SMTP->email_cc($admin_email); 
                } 
                $i++; 
            } 
        } 
        $SMTP->send(); 
        //------------------------------------ 

        $Template->page_transfer($Lang->data["contact_success_send"], $Info->option['site_url'] . $Func->compile_url('')); 
        return true; 
    } 
} 
?>