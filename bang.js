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
var bang = function bang( method, URL, requestOverride ){
	/*:
		@meta-configuration:
			{
				"method:required": "string",
				"URL:required": "string",
				"requestOverride:optional": "function"
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

	request.open( method, URL, false );

	if( typeof requestOverride != "undefined" ){
		requestOverride( request );
	}

	try{
		request.send( );

		return request;

	}catch( error ){
		console.error( error );
		request.error = error;
		return request;
	}
};