function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function language(){
    dil=getCookie("dil");
    dil= dil=="" ? "tr" : dil;
    if(dil=="tr"){
        document.getElementById("aktif_dil").src="images/icon/tr.png";
        document.getElementById("dil_kodu").innerText="TR";
         jQuery.each(language_tr, function(i, val) {
             if(i!="mail"){
                 document.getElementById(i).innerHTML=val;
             }

        });

         // PLACEHOLDER
        document.getElementsByName('isim')[0].placeholder=language_tr.mail.isim;
         document.getElementsByName('email')[0].placeholder=language_tr.mail.email_adres;
         document.getElementsByName('konu')[0].placeholder=language_tr.mail.mesaj_konusu;
         document.getElementsByName('mesaj')[0].placeholder=language_tr.mail.mesaj;
    }else{
        document.getElementById("aktif_dil").src="images/icon/en.png";
        document.getElementById("dil_kodu").innerText="EN";
         jQuery.each(language_en, function(i, val) {
            if(i!="mail"){
                 document.getElementById(i).innerHTML=val;
             }
        });
         // PLACEHOLDER
        document.getElementsByName('isim')[0].placeholder=language_en.mail.isim;
         document.getElementsByName('email')[0].placeholder=language_en.mail.email_adres;
         document.getElementsByName('konu')[0].placeholder=language_en.mail.mesaj_konusu;
         document.getElementsByName('mesaj')[0].placeholder=language_en.mail.mesaj;
    }
}
function language_change(dil) {
    setCookie("dil",dil,30);
    language();

}

function iletisim_formu(){
    var data=$("#contact-form").serialize();
    $.ajax({
        data:data,
        url:"php/mail.php",
        type:"POST",
        success:function (cevap) {

                dil=getCookie("dil");
                if(dil=="en"){
                    if(cevap=="0"){
                          swal(language_en.mail.hatali_giris, "", "error"); // EN HATALI MESAJ
                    }else if(cevap=="OK"){
                        swal(language_en.mail.basarili_mail_mesaji, "", "success"); // EN BAŞARILI MESAJ
                         document.getElementById("buton").disabled = true; // Mesaj gönderildiğinde butonu kapatıyorum
                    }else{
                         swal(cevap, "", "info"); // EN SSİTEM HATALI MESAJ
                    }
                }else{
                     if(cevap=="0"){
                        swal(language_tr.mail.hatali_giris, "", "error"); // TR HATALI MESAJ
                    }else if(cevap=="OK"){
                      swal(language_tr.mail.basarili_mail_mesaji, "", "success"); // TR BAŞARILI MESAJ
                      document.getElementById("buton").disabled = true; // Mesaj gönderildiğinde butonu kapatıyorum
                    }else{
                       swal(cevap, "", "info"); // TR SİSTEM MESAJ
                    }
                }

        },error:function (ex) {
            alert("ERROR");
        }
    });
}

$(function () {
    language();

});


function slider(){
     $(window).load(function(){
      $('.flexslider').flexslider({
        animation: "slide",
        controls:false
      });
    });
}