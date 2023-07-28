#!/bin/bash

# colibri
rm -rf $PHASEREDITOR_HOME/helpcenter-phaser3/source/editor/app/plugins/colibri
cp -R $PHASEREDITOR_HOME/PhaserEditor2D-v3/source/editor/plugins/colibri ../source/editor/app/plugins/

# colibri.inspector
rm -rf $PHASEREDITOR_HOME/helpcenter-phaser3/source/editor/app/plugins/colibri.inspector
cp -R $PHASEREDITOR_HOME/PhaserEditor2D-v3/source/editor/plugins/colibri.inspector ../source/editor/app/plugins/