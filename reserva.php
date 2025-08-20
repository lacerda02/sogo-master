<?php
if($_SERVER["REQUEST_METHOD"] == "POST"){
    $nome = $_POST['name'];
    $telefone = $_POST['phone'];
    $email = $_POST['email'];
    $destino = $_POST['destination'];
    $checkin = $_POST['checkin_date'];
    $checkout = $_POST['checkout_date'];
    $adultos = $_POST['adults'];
    $criancas = $_POST['children'];
    $mensagem = $_POST['message'];

    $para = "dinhojose894@gmail.com"; // Email da empresa
    $assunto = "Nova Reserva de Turismo";
    
    $corpo = "Nova reserva recebida:\n\n";
    $corpo .= "Nome: $nome\n";
    $corpo .= "Telefone: $telefone\n";
    $corpo .= "Email: $email\n";
    $corpo .= "Destino: $destino\n";
    $corpo .= "Check-In: $checkin\n";
    $corpo .= "Check-Out: $checkout\n";
    $corpo .= "Adultos: $adultos\n";
    $corpo .= "Crianças: $criancas\n";
    $corpo .= "Notas adicionais: $mensagem\n";

    $cabecalho = "From: $email";

    if(mail($para, $assunto, $corpo, $cabecalho)){
        echo "Reserva enviada com sucesso!";
    } else {
        echo "Erro ao enviar reserva. Tente novamente.";
    }
}
?>
