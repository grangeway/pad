var STDOUT = WScript.StdOut;
var STDERR = WScript.StdErr;
var WshShell = WScript.CreateObject("WScript.Shell");
var FSO = WScript.CreateObject("Scripting.FileSystemObject");

function replace_folder( a ) {
	if( FSO.FolderExists( a ) ) {
		FSO.DeleteFolder( a );
	}
	FSO.CreateFolder( a );
}

replace_folder("build");

var CC = SCALA_HOME + "\\bin\\fsc.bat";

STDOUT.WriteLine("compiling with '" + CC + "'...");

CP = "build/;" + CP;

function find_files( a, b ) {
	var fo = FSO.GetFolder(a);
	var subFlds = new Enumerator(fo.files);
	var ret = "";
	for (; !subFlds.atEnd(); subFlds.moveNext()) {
		if( FSO.GetExtensionName( subFlds.item() ) == b ) {
			ret = ret + " " + subFlds.item();
		}
	}
	
	var subFlds = new Enumerator(fo.subfolders);
	for (; !subFlds.atEnd(); subFlds.moveNext()) {
		ret = ret + find_files(subFlds.item(), b);
	}
	
	return ret;
}

var COMMONFILES = find_files("net.appjet.common","java");
var COMMONSCALAFILES = find_files("net.appjet.common","scala");

replace_folder( "buildcache\\common");
execute( JAVAC + " -cp " + CP + " -d buildcache\\common	-target 1.5 " + COMMONFILES );
execute( CC + "	-verbose -classpath " + CP + " -d buildcache\\common -target:jvm-1.5 " + COMMONSCALAFILES );

STDOUT.WriteLine( "compiling sars..." );
var SARSFILES = find_files("net.appjet.common.sars","scala");
replace_folder( "buildcache\\sars");

execute( CC + " -classpath " + CP + " -d buildcache\\sars -target:jvm-1.5 " + SARSFILES );


STDOUT.WriteLine( "compiling cli...");
	var CLIFILES = find_files("net.appjet.common.cli","scala");
	replace_folder( "buildcache\\cli");
	execute( CC + " -classpath " + CP + " -d buildcache\\cli -target:jvm-1.5 " + CLIFILES );
STDOUT.WriteLine( "done with cli" );

STDOUT.WriteLine( "compiling rhino abstraction...");
	var BODYLOCKFILES = find_files("net.appjet.bodylock","scala");
	replace_folder( "buildcache\\bodylock");
	execute( CC + " -classpath buildcache;" + CP + " -d buildcache\\bodylock -target:jvm-1.5 " + BODYLOCKFILES );
STDOUT.WriteLine( "done with rhino abstraction" );

STDOUT.WriteLine( "compiling appserver source...");
	var APPSERVERFILES = find_files("net.appjet.oui","scala");
	var APPSERVERJAVAFILES = find_files("net.appjet.oui","java");
	replace_folder( "buildcache\\appserver");
	execute( JAVAC + " -cp " + CP + " -d buildcache\\appserver -target 1.5 " + APPSERVERJAVAFILES );
	execute( CC + " -classpath " + CP + " -d buildcache\\appserver -target:jvm-1.5 " + APPSERVERFILES );
STDOUT.WriteLine( "done with appserver source" );

STDOUT.WriteLine( "compiling ajstdlib...");
	var AJSTDLIBFILES = find_files("net.appjet.ajstdlib","scala");
	var AJSTDLIBJAVAFILES = find_files("net.appjet.ajstdlib","java");
	replace_folder( "buildcache\\ajstdlib");
	execute( JAVAC + " -cp " + CP + " -d buildcache\\ajstdlib -target 1.5 " + AJSTDLIBJAVAFILES );
	execute( CC + " -classpath " + CP + " -d buildcache\\ajstdlib -target:jvm-1.5 " + AJSTDLIBFILES );
STDOUT.WriteLine( "done with ajstdlib" );

STDOUT.WriteLine( "compiling etherpad...");
	var EPFILES = find_files("com.etherpad","scala");
	replace_folder( "buildcache\\etherpad");
	execute( CC + " -classpath " + CP + " -d buildcache\\etherpad -target:jvm-1.5 " + EPFILES );
STDOUT.WriteLine( "done with etherpad" );

/*

OOSERVICEFILES=`find com.etherpad.openofficeservice -name '*.scala'`
function genooservice {
    echo "compiling ooservice..."
    $CC \
	-classpath $CP \
	-d $1 \
	-target:jvm-1.5 \
	$ARGS \
	$OOSERVICEFILES
}
cacheonfiles ooservice "$OOSERVICEFILES" genooservice
*/

STDOUT.WriteLine( "copying files..." );


/*
cp net.appjet.ajstdlib/streaming-client.js build/net/appjet/ajstdlib/
if [ $OBFUSC ] ; then
    echo obfuscating...
    scala -classpath $CP:. net.appjet.bodylock.compressor \
	build/net/appjet/ajstdlib/streaming-client.js
fi

cp net.appjet.ajstdlib/streaming-iframe.html build/net/appjet/ajstdlib/
mkdir -p build/net/appjet/ajstdlib/modules

echo "building javascript classfiles..."
scala -classpath $CP net.appjet.bodylock.Compiler \
    -destination=build/net/appjet/ajstdlib/ \
    -cutPrefix=framework-src \
    `find framework-src -name '*.js'`

echo "done."
*/