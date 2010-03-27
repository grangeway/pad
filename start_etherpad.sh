#!/bin/bash

export JAVA_HOME="/usr/lib/jvm/java-6-sun/"
export SCALA_HOME="/usr/src/scala-2.7.7.final"
export MYSQL_CONNECTOR_JAR="/usr/src/mysql-connector-java-5.1.10/mysql-connector-java-5.1.10-bin.jar"
export SCALA="$SCALA_HOME/bin/scala"
export JAVA="$JAVA_HOME/bin/java"
export PATH="$JAVA_HOME/bin:$SCALA_HOME/bin:/usr/local/mysql/bin:$PATH"

cd etherpad
./bin/run-local.sh > /dev/null &
