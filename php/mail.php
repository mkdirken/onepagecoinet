<?php
    if($_POST){
        die("404");
    }else{

        $isim=trim($_POST["isim"]);
        $mesaj=trim($_POST["mesaj"]);
        $konu=trim($_POST["konu"];
        $eposta=trim($_POST["eposta"]);

        ## kontrol edelim
        if($isim=="" || $mesaj=="" || $konu=="" || $eposta==""){
            echo "0";
        }else{

            $hangi_epostaya="mkdirken@gmail.com";
            $hosting_giden_sunucu_adresi="mail.anadolufarmizmir.com";
            $hosting_eposta="bilisim@anadolufarmizmir.com";
            $hosting_eposta_sifre="ufuk008431";
            ## PHP MAİLLER İÇİN DOSYALARI DAHİL EDELİM

            include("phpmailer/class.phpmailer.php");
            include("phpmailer/class.smtp.php");
            include("phpmailer/class.pop3.php");
            include("phpmailer/PHPMailerAutoload.php");

               $mail = new PHPMailer();
                $mail->IsSMTP();
                $mail->SMTPAuth = true;
                $mail->Host = $hosting_giden_sunucu_adresi;
                $mail->Port = 587;
                $mail->SMTPSecure = 'tls';
                $mail->Username = $hosting_eposta;
                $mail->Password = $hosting_eposta_sifre;
                $mail->SetFrom($mail->Username,$isim);
                $mail->AddAddress($hangi_epostaya,$isim);
                $mail->CharSet = 'UTF-8';
                $mail->Subject = $konu;
                $content = "<h2 align='center'>".$eposta."</h2>"."<div align='center'>".$mesaj."</div>";
                $mail->MsgHTML($content);
                if($mail->Send()) {
                    // e-posta başarılı ile gönderildi
                    echo "OK";
                } else {
                    // bir sorun var, sorunu ekrana bastıralım
                    echo $mail->ErrorInfo;
                }

        }


    }

?>