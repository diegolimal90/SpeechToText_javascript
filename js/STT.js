window.addEventListener('DOMContentLoaded', function(){
	
	var btn_ouvir = document.querySelector('#ouvir');
	
	var trans_audio = '';
	var ouvindo = false;
	
	if( window.SpeechRecognition || window.webkitSpeechRecognition ){
		
		var speechApi = window.SpeechRecognition || window.webkitSpeechRecognition;
		var rec = new speechApi();
		
		rec.continuous = true;//se a gravação será continua ou não
		rec.interimResults = true;//alterar texto caso ele reconheça outra palavra
		rec.lang = 'pt-BR';//linguagem para reconhecimento
		
		rec.onstart = function(){
			
			ouvindo = true;
			btn_ouvir.innerHTML = "Ouvindo";
			
		};
		
		rec.onend = function(){
			
			ouvindo  = false;
			btn_ouvir.innerHTML = "OUVIR";
		};
		
		rec.onresult = function(event){
			var interim_trans = '';
			
			for(var i=event.resultIndex; i< event.results.length; i++){
				if(event.results[i].isFinal){
					trans_audio += event.results[i][0].transcript;
				}else{
					interim_trans += event.results[i][0].transcript;
				}
				
				var resultado = trans_audio || interim_trans;
				//console.log(resultado);
				
				document.getElementById('txt').innerHTML = resultado
			}
			/*trans_audio = event.results[0][0].transcript;
			console.log(trans_audio);*/
			
		};
		
		btn_ouvir.addEventListener('click', function(e){
			if(ouvindo){
				rec.stop();
				return;				
			}
			rec.start();
		}, false);
		
	}else{
		console.log('Navegador não possui suporte a web speech!');
	}
}, false);