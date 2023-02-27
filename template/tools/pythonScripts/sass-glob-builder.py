# CAUTION ========================================
# This script is designed to be executed by a NPM Script inside of  'template/package.json'
# So relative paths are based on 'template/package.json'.

import os
import glob
import shutil
print('======== EXECUTING sass-glob-builder.py')


# 1. Copy the dev sass file
SOURCE_FILE = "./main.scss"
DESTINATION_FILE = './tools/temp/devsass.txt'

backupfile = glob.glob(DESTINATION_FILE, recursive=True)

if (len(backupfile) > 0) :
    print('  - BACKUP SKIPPED:', DESTINATION_FILE, 'already exists.')
else :
    shutil.copy2(SOURCE_FILE, DESTINATION_FILE)
    print('  - BACKUP DONE:', DESTINATION_FILE)



# 2. Collect all sass file and rerite the main.scss
SRC_DIR = ".." # Based on template/package.json
OUTPUT_FILE = "./main.scss"

## 2-1. Import mixin files with _*.scss
files = [f for f in glob.glob(os.path.join(SRC_DIR, "template/**/_*.scss"), recursive=True)]
with open(OUTPUT_FILE, "w+") as f:
    for file in files:
        f.write(f"@import '{file}';\n")

## 2-2. Import Rests.
# Write the list of files to the output file in the desired format

files = [f for f in glob.glob(os.path.join(SRC_DIR, "template/**/*.scss"), recursive=True) 
         if (not f.endswith('main.scss'))]
with open(OUTPUT_FILE, "a+") as f:
    for file in files:
        f.write(f"@import '{file}';\n")

files = [f for f in glob.glob(os.path.join(SRC_DIR, "src/**/*.scss"), recursive=True) 
         if (not f.endswith('main.scss'))]
with open(OUTPUT_FILE, "a+") as f:
    for file in files:
        f.write(f"@import '{file}';\n")



print('  - PROCESS DONE')
print(" ", len(files), ".scss files merged into", OUTPUT_FILE, "\n\n")