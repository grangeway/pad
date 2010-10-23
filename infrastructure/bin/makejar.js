STDOUT.WriteLine("using JAR " + JAVA_JAR + "...");

FSO.CopyFile( MYSQL_CONNECTOR_JAR, "lib\\");

// caching
if ( ! FSO.FolderExists("buildcache") ) {
	FSO.CreateFolder( "buildcache");
}
if ( ! FSO.FolderExists("buildcache\\JAR") ) {
	FSO.CreateFolder( "buildcache\\JAR");
}

// genjar
STDOUT.WriteLine("unzipping JARs...");

var OLD_WD = WshShell.CurrentDirectory;

/*
WshShell.CurrentDirectory = "buildcache\\JAR";


execute( JAVA_JAR + " xf " + SCALA_LIBRARY_JAR);

if( FSO.FolderExists( "META-INF") ) { FSO.DeleteFolder("META-INF"); }

var fo = FSO.GetFolder("..\\..\\lib\\");
var subFlds = new Enumerator(fo.files);

for (; !subFlds.atEnd(); subFlds.moveNext()) {
	if( FSO.GetExtensionName( subFlds.item() ) ) { // TODO . jar?
		STDOUT.WriteLine("Extracting... " + subFlds.item());
		execute( JAVA_JAR + " xf " + subFlds.item());

		if( FSO.FolderExists( "META-INF/maven") ) { FSO.DeleteFolder("META-INF/maven"); }
		if( FSO.FileExists( "META-INF/MANIFEST.MF" ) ) { FSO.DeleteFile( "META-INF/MANIFEST.MF" ); }
		if( FSO.FileExists( "META-INF/NOTICE" ) ) { FSO.DeleteFile( "META-INF/Notice" ); }
		if( FSO.FileExists( "META-INF/Notice.txt" ) ) { FSO.DeleteFile( "META-INF/Notice.txt" ); }
		if( FSO.FileExists( "META-INF/License" ) ) { FSO.DeleteFile( "META-INF/license" ); }
		if( FSO.FileExists( "META-INF/license.txt" ) ) { FSO.DeleteFile( "META-INF/license.txt" ); }
		if( FSO.FileExists( "META-INF/index.list" ) ) { FSO.DeleteFile( "META-INF/index.list" ); }
		if( FSO.FileExists( "META-INF/SUN_MICR.RSA" ) ) { FSO.DeleteFile( "META-INF/SUN_MICR.RSA" ); }
		if( FSO.FileExists( "META-INF/SUN_MICR.SF" ) ) { FSO.DeleteFile( "META-INF/SUN_MICR.SF" ); }
	}
}

STDOUT.WriteLine("making cached JAR....");

execute( JAVA_JAR + " -cfm appjet.jar ..\\..\\lib\\manifest ." );

FSO.MoveFile( "appjet.jar", "..\\" );

WshShell.CurrentDirectory = "..\\";
FSO.DeleteFolder( "JAR" );
FSO.CreateFolder( "JAR");
FSO.MoveFile( "appjet.jar", "JAR\\" );
WshShell.CurrentDirectory = "JAR\\";
// end genjar
*/
WshShell.CurrentDirectory = OLD_WD;