/*:
	@module-configuration:
		{
			"packageName": "bang",
			"fileName": "bang.js",
			"moduleName": "bang",
			"authorName": "Richeve S. Bebedor",
			"authorEMail": "richeve.bebedor@gmail.com",
			"repository": "git@github.com:volkovasystems/bang.git",
			"testCase": "bang-test.js",
			"isGlobal": true
		}
	@end-module-configuration

	@module-documentation:

	@end-module-documentation
*/
var bang = function bang( method, URL, catcher ){
	/*:
		@meta-configuration:
			{
				"method:required": "string",
				"URL:required": "string",
				"catcher:optional": "function"
			}
		@end-meta-configuration
	*/

	var request;
	if( "XMLHttpRequest" in window ){
		request = new XMLHttpRequest( );

	}else if( "ActiveXObject" in window ){
		try{
			request = new ActiveXObject( "Msxml2.XMLHTTP" );
		}catch( error ){
			console.warn( "Msxml2.XMLHTTP is not supported trying Microsoft.XMLHTTP" );
			console.error( error );

			try{
				request = new ActiveXObject( "Microsoft.XMLHTTP" );
			}catch( error ){
				console.warn( "Microsoft.XMLHTTP is not supported" );
				console.error( error );

				error = new Error( "fatal:procedure lacks the required support" );
				console.error( error );
				throw error;
			}
		}
	}

	var hasCatcher = false;
	if( typeof catcher == "function" ){
		hasCatcher = true;

		request.onreadstatechange = function onReadyStateChange( ){
			var parameterList = Array.prototype.slice.call( arguments );

            parameterList.splice( 0, 1, null );

			catcher.apply( request, parameterList );
		};
	}

	if( hasCatcher ){
		request.open( method, URL );

        try{
            request.send( );
        }catch( error ){
            console.error( error );
            catcher.call( request, error );
        }

	}else{
		request.open( method, URL, false );

        try{
            request.send( );

            if( request.status == 200 ){
                return request.responseText;
            }else{
                var error = new Error( "request failed" );
                console.error( error );
                throw error;
            }
        }catch( error ){
            console.error( error );
            throw error;
        }
	}
};