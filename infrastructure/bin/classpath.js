var CP = "./";

var fo = FSO.GetFolder("lib\\");
var subFlds = new Enumerator(fo.files);

for (; !subFlds.atEnd(); subFlds.moveNext()) {
	if( FSO.GetExtensionName( subFlds.item() ) == "jar" ) {
		CP = CP + ";" + subFlds.item();
	}
}
//STDOUT.WriteLine (CP);
