var STDOUT = WScript.StdOut;
var STDERR = WScript.StdErr;
var WshShell = WScript.CreateObject("WScript.Shell");
var FSO = WScript.CreateObject("Scripting.FileSystemObject");
var MFO = null;
var SYSTEM_DRIVE = WshShell.Environment("Process").Item("SystemDrive");
var PROGRAM_FILES = WshShell.Environment("Process").Item("ProgramFiles");

if (PROGRAM_FILES == null) {
	PROGRAM_FILES = "C:\\Program Files";
}

if (!FSO.FileExists("INSTALL")) {
	STDERR.WriteLine("Must be run from the root of the etherpad source");
	WScript.Quit(10);
}

var ETHERPADDIR = WshShell.CurrentDirectory;

if (typeof(ETHERPADDIR) == "undefined") {
	ETHERPADDIR = FSO.GetParentFolderName(FSO.GetAbsolutePathName("INSTALL"));
}

// Step 1 - Locate Java

if ( setup_java() == false ) {
	STDERR.WriteLine("Java/JDK Not Found - Aborting...");
	WScript.Quit(10);	
}

STDOUT.WriteLine("Java Home Set to: " + JAVA_HOME);
STDOUT.WriteLine("Java Binary Set to: " + JAVA);
STDOUT.WriteLine("Java Jar Set to: " + JAVA_JAR);
STDOUT.WriteLine("Java Compiler Set to: " + JAVAC);

// Step 2 - MYSQL_CONNECTOR_JAR

if ( setup_mysql_connetor() == false ) {
	STDERR.WriteLine("Java Mysql Connector Not Found - Aborting...");
	WScript.Quit(10);	
}

STDOUT.WriteLine("Mysql Connector Set to: " + MYSQL_CONNECTOR_JAR);

// Step 3 - Setup Scala

if ( setup_scala() == false ) {
	STDERR.WriteLine("Scala Not Found - Aborting...");
	WScript.Quit(10);	
}

//        export SCALA_HOME="/usr/local/share/scala-2.7.7"
//        export SCALA="$SCALA_HOME/bin/scala"
//       export SCALA_LIBRARY_JAR="/usr/local/share/scala-2.7.7/lib/scala-library.jar"


STDOUT.WriteLine("SCALA_HOME Set to: " + SCALA_HOME);
STDOUT.WriteLine("SCALA Set to: " + SCALA);
STDOUT.WriteLine("SCALA_LIBRARY_JAR Set to: " + SCALA_LIBRARY_JAR);

function setup_scala() {
	var env = WshShell.Environment("Process").Item("SCALA_HOME");
	
	if ( !env ) {
		STDERR.WriteLine("Set SCALA_HOME Environment variable");	
	} else {
		SCALA_HOME = env;
		if ( FSO.FileExists( SCALA_HOME + "\\bin\\scala.bat" ) ) {
			SCALA = SCALA_HOME + "\\bin\\scala.bat";
		} else {
			return false;
		}

		if ( FSO.FileExists( SCALA_HOME + "\\lib\\scala-library.jar" ) ) {
			SCALA_LIBRARY_JAR = SCALA_HOME + "\\lib\\scala-library.jar";
		} else {
			return false;
		}		
		return true;
	}
		
	return false;
}

function setup_mysql_connetor() {
	var env = WshShell.Environment("Process").Item("MYSQL_CONNECTOR_JAR");
	
	if ( !env ) {
		STDERR.WriteLine("Set MYSQL_CONNECTOR_JAR Environment variable");	
	} else {
		MYSQL_CONNECTOR_JAR = env;
		return true;
	}
	
	// TODO: check file exists
	// TODO: check file ends in .jar
	
	return false;
}

function setup_java() {
	var env = WshShell.Environment("Process").Item("JAVA_HOME");
	
	if ( env ) {
		STDOUT.WriteLine("JDK from Environment Variable: " + env);
		JAVA_HOME = env;
		if ( FSO.FileExists( JAVA_HOME + "\\bin\\java.exe" ) ) {
			JAVA = JAVA_HOME + "\\bin\\java.exe";
		} else {
			return false;
		}
		
		if ( FSO.FileExists( JAVA_HOME + "\\bin\\jar.exe" ) ) {
			JAVA_JAR = JAVA_HOME + "\\bin\\jar.exe";
		} else {
			return false;
		}		

		if ( FSO.FileExists( JAVA_HOME + "\\bin\\javac.exe" ) ) {
			JAVAC = JAVA_HOME + "\\bin\\javac.exe";
		} else {
			return false;
		}			
		return true;
	}

	var reg_jv = RegistryKeyRead( "HKLM\\SOFTWARE\\JavaSoft\\Java Development Kit\\CurrentVersion", true );
	if (reg_jv != false ) {
		STDOUT.WriteLine("JDK Version from Registry: " + reg_jv);
		var reg_j_path = RegistryKeyRead( "HKLM\\SOFTWARE\\JavaSoft\\Java Development Kit\\CurrentVersion\\" + reg_jv + "\\JavaHome", true );
		// jdk path found in reg
		
		JAVA_HOME = reg_j_path;
		if ( FSO.FileExists( JAVA_HOME + "\\bin\\java.exe" ) ) {
			JAVA = JAVA_HOME + "\\bin\\java.exe";
		} else {
			return false;
		}

		if ( FSO.FileExists( JAVA_HOME + "\\bin\\jar.exe" ) ) {
			JAVA_JAR = JAVA_HOME + "\\bin\\jar.exe";
		} else {
			return false;
		}

		return true;
	}
	return false;
}

function logenv( o )
{
    oEnum = new Enumerator( o ) ;
    for (;!oEnum.atEnd();oEnum.moveNext() )
    {
        var oSelItem = oEnum.item() ;
        STDOUT.WriteLine( oSelItem  );
    }
}

/* execute a command and return the output as a string */
function execute(command_line)
{
	//STDOUT.WriteLine("command: " + command_line);
	var e = WshShell.Exec(command_line);
	var ret = "";

	ret = e.StdOut.ReadAll();

	STDOUT.WriteLine(ret);

	return ret;
}


function RegistryKeyRead (RegistryKey, silent)
{
    try {
		var ret = WshShell.RegRead(RegistryKey);
	} catch(e) {
		if ( silent == false ) {
			WScript.Echo(e.description);
		}
		return false;
	}
	return ret;
}