var pulsoesquerdox = 0 
var pulsoesquerdoy = 0 
var pulsodireitox = 0 
var pulsodireitoy = 0 
var musica = ''
var pontuacaopulsoesquerdo = 0 
var pontuacaopulsodireito = 0 
function preload(){
    musica = loadSound('music.mp3')
}
function setup(){
canvas = createCanvas (600 , 500 )
canvas.center()
video = createCapture(VIDEO)
video.hide ()
posenet = ml5.poseNet(video , carregarmodelo )
posenet.on('pose' , resultados)
}
function draw(){
    image(video , 0 , 0 , 600 , 500)

    fill('blue')
    stroke('blue')

    if( pontuacaopulsodireito >= 0.001 ){
    fill('red')
    stroke('red')
    circle(pulsodireitox , pulsodireitoy , 25 )

    if(pulsodireitoy >0 && pulsodireitoy <=100 ){
        document.getElementById('velocidade').innerHTML = 'velocidade = 0.5x' 
        musica.rate(0.5)

    }
    else if(pulsodireitoy >100 && pulsodireitoy <=200){
        document.getElementById('velocidade').innerHTML = 'velocidade = 1'
        musica.rate(1)
    }

else if(pulsodireitoy >200 && pulsodireitoy <=300){
    document.getElementById('velocidade').innerHTML = 'velocidade = 1.5'
    musica.rate(1.5)
}


else if(pulsodireitoy >300 && pulsodireitoy <=400){
    document.getElementById('velocidade').innerHTML = 'velocidade = 2'
    musica.rate(2)
}
else if(pulsodireitoy >400 && pulsodireitoy <=500){
    document.getElementById('velocidade').innerHTML = 'velocidade = 2.5'
    musica.rate(2.5)
}
}

  


if( pontuacaopulsoesquerdo >= 0.001 ){

    circle(pulsoesquerdox , pulsoesquerdoy , 25 )
    Numero = Number(pulsoesquerdoy)
    inteiro = floor(Numero)
    volume = inteiro / 500 
    document.getElementById('volume').innerHTML = 'volume:  ' +  volume 
    musica.setVolume(volume)
}


}
function reproduzir(){
    musica.play()
    musica.setVolume(1)
    musica.rate(1)

}
function carregarmodelo(){
    console.log('carregado')
}
function resultados(results){
 if(results.length > 0 ){
    console.log (results)
    pulsoesquerdox = results[0].pose.leftWrist.x
    pulsoesquerdoy = results[0].pose.leftWrist.y
    console.log('pulsoesquerox = ' + pulsoesquerdox + 'pulsoesqueroy = ' + pulsoesquerdoy)

   pulsodireitox = results[0].pose.rightWrist.x
    pulsodireitoy = results[0].pose.rightWrist.y
    console.log('pulsodireitox = ' + pulsodireitox + 'pulsodireitoy = ' + pulsodireitoy)

    pontuacaopulsoesquerdo = results [0].pose.keypoints[9].score
    console.log(pontuacaopulsoesquerdo)

    pontuacaopulsodireito = results [0].pose.keypoints[10].score
    console.log(pontuacaopulsodireito)
  }



}
